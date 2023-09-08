export interface LabInput {
  symbol: string;
  description: string;
}
export interface LabOutput {
  symbol: string;
  description: string;
  formula: string;
}
export class LabSetting {
  inputs: LabInput[] = [];
  outputs: LabOutput[] = [];
}

export class Lab {
  name = '';
  description = '';
  checksum = '';
  lab: LabSetting = new LabSetting();
}
