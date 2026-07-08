// modules/rental/rental.interface.ts

import { RentalStatus } from "../../generated/prisma";



export interface CreateRentalPayload {
  gearId: string;
  quantity: number;
  startDate: Date;
  endDate: Date;
}

export interface UpdateRentalStatusPayload {
  status: RentalStatus;
}