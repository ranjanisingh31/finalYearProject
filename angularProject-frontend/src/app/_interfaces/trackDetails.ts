import { editVehicle } from './editVehicle';

export interface trackDetails {
  address: string;
  city: string;
  companyDesc: string;
  companyName: string;
  email: string;
  fullName: string;
  mob: string;
  postalCode: string;
  state: string;
  trackFor: string;
  url: string;
  selectedPlan: {
    _id: string;
    vehicle: string;
    type: string;
    price: number;
    intervals: string;
  };
  message: string;
  addVehicle: editVehicle[]
}
