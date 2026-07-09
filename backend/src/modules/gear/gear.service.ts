
import httpStatus from "http-status";
import { prisma } from "../../config/prisma";
import AppError from "../../error/Apperror";
import { Prisma } from "../../generated/prisma";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { TCreateGearPayload } from "./gear.interface";

const createGear = async (
  providerId: string,
  payload: TCreateGearPayload,
  files: Express.Multer.File[]
) => {
  // Check category
  const category = await prisma.category.findUnique({
    where: {
      id: payload.categoryId,
    },
  });

  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found.");
  }

  // Check provider
  const provider = await prisma.user.findUnique({
    where: {
      id: providerId,
    },
  });

  if (!provider) {
    throw new AppError(httpStatus.NOT_FOUND, "Provider not found.");
  }

  // Upload images to Cloudinary
  const imageUrls: string[] = [];

  if (files?.length) {
    for (const file of files) {
      const uploadedImage = await uploadToCloudinary(
        file,
        "gearup/gear"
      );

      imageUrls.push(uploadedImage.secure_url);
    }
  }

  // Create gear
  const gear = await prisma.gearItem.create({
    data: {
      providerId,
      categoryId: payload.categoryId,
      name: payload.name.trim(),
      brand: payload.brand.trim(),
      description: payload.description.trim(),
      pricePerDay: Number(payload.pricePerDay),
      stock: Number(payload.stock),
      images: imageUrls,
    },
    include: {
      category: true,
      provider: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return gear;
};




const getAllGear = async (query: Record<string, any>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const search = query.search || "";
  const categoryId = query.categoryId;
  const brand = query.brand;
  const minPrice = query.minPrice;
  const maxPrice = query.maxPrice;
  const isAvailable = query.isAvailable;

  const where: any = {};

  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        brand: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (brand) {
    where.brand = {
      contains: brand,
      mode: "insensitive",
    };
  }

  if (isAvailable !== undefined) {
    where.isAvailable = isAvailable === "true";
  }

  if (minPrice || maxPrice) {
    where.pricePerDay = {};

    if (minPrice) {
      where.pricePerDay.gte = Number(minPrice);
    }

    if (maxPrice) {
      where.pricePerDay.lte = Number(maxPrice);
    }
  }

  const gear = await prisma.gearItem.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      provider: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const total = await prisma.gearItem.count({
    where,
  });

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: gear,
  };
};



// get single gear 
const getSingleGear = async (id: string) => {
  const gear = await prisma.gearItem.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      provider: {
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
        },
      },
     reviews: {
  include: {
    customer: {
      select: {
        id: true,
        name: true,
        profileImage: true,
      },
    },
  },
  orderBy: {
    createdAt: "desc",
  },
},
    },
  });

  if (!gear) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Gear not found."
    );
  }

  return gear;
};


// getmyowngear
const getMyGear = async (
  providerId: string,
  query: Record<string, any>
) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const search = query.search || "";

  const where: any = {
    providerId,
  };

  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        brand: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  const gears = await prisma.gearItem.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
  });

  const total = await prisma.gearItem.count({
    where,
  });

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: gears,
  };
};

// getmysingle gear

const getMySingleGear = async (
  providerId: string,
  gearId: string
) => {
  const gear = await prisma.gearItem.findUnique({
    where: {
      id: gearId,
    },
    include: {
      category: true,
    },
  });

  if (!gear) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Gear not found."
    );
  }

  if (gear.providerId !== providerId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to access this gear."
    );
  }

  return gear;
};

// update gear
const updateGear = async (
  providerId: string,
  gearId: string,
  payload: Partial<{
    categoryId: string;
    name: string;
    brand: string;
    description: string;
    pricePerDay: number;
    stock: number;
    images: string[];
    isAvailable: boolean;
  }>
) => {
  const gear = await prisma.gearItem.findUnique({
    where: {
      id: gearId,
    },
  });

  if (!gear) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Gear not found."
    );
  }

  if (gear.providerId !== providerId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to update this gear."
    );
  }

  if (payload.categoryId) {
    const category = await prisma.category.findUnique({
      where: {
        id: payload.categoryId,
      },
    });

    if (!category) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "Category not found."
      );
    }
  }

  const updatedGear = await prisma.gearItem.update({
    where: {
      id: gearId,
    },
    data: {
      ...payload,
      name: payload.name?.trim(),
      brand: payload.brand?.trim(),
      description: payload.description?.trim(),
    },
    include: {
      category: true,
    },
  });

  return updatedGear;
}; 

// delete gear
const deleteGear = async (
  providerId: string,
  gearId: string
) => {
  const gear = await prisma.gearItem.findUnique({
    where: {
      id: gearId,
    },
  });

  if (!gear) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Gear not found."
    );
  }

  if (gear.providerId !== providerId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to delete this gear."
    );
  }

  await prisma.gearItem.delete({
    where: {
      id: gearId,
    },
  });

  return null;
};


const getAllGearService = async (query: Record<string, any>) => {
  const {
    search,
    category,
    brand,
    minPrice,
    maxPrice,
    available,
    page = "1",
    limit = "10",
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  const where: Prisma.GearItemWhereInput = {};

  // Search by name or description
  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  // Category filter
  if (category) {
    where.categoryId = category;
  }

  // Brand filter
  if (brand) {
    where.brand = {
      contains: brand,
      mode: "insensitive",
    };
  }

  // Price filter
  if (minPrice || maxPrice) {
    where.pricePerDay = {};

    if (minPrice) {
      where.pricePerDay.gte = Number(minPrice);
    }

    if (maxPrice) {
      where.pricePerDay.lte = Number(maxPrice);
    }
  }

  // Availability filter
 if (available !== undefined) {
  where.isAvailable = available === "true";
}
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const skip = (pageNumber - 1) * limitNumber;

const orderBy: Prisma.GearItemOrderByWithRelationInput = {
  [sortBy]:
    sortOrder === "asc"
      ? Prisma.SortOrder.asc
      : Prisma.SortOrder.desc,
};

console.log("Order By:", orderBy);

  const [gear, total] = await Promise.all([
    prisma.gearItem.findMany({
      where,
      skip,
      take: limitNumber,
      orderBy: {
         [sortBy]:
    sortOrder === "asc"
      ? Prisma.SortOrder.asc
      : Prisma.SortOrder.desc,
      },
      include: {
        category: true,
        provider: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    }),

    prisma.gearItem.count({
      where,
    }),
  ]);

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPage: Math.ceil(total / limitNumber),
    },
    data: gear,
  };
};

export const GearService = {
  createGear,
    getAllGear,
    getSingleGear,
    getMyGear,
    getMySingleGear,
    updateGear,
    deleteGear,
getAllGearService
};