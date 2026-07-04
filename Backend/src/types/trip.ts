import { RowDataPacket } from "mysql2";

export interface Trip extends RowDataPacket {
  id: number;
  user_id: number;
  destination: string;
  start_date: string;
  end_date: string;
}

export interface SearchTripResult extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  start_date: string;
  end_date: string;
}

export interface AddTripRequest {
  destination: string;
  start_date: string;
  end_date: string;
}
