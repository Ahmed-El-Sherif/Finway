import { FieldTypeEnum } from "./_enums/field-type.enum";

export interface CardField {
  title: string;
  property: string;
  type: FieldTypeEnum;
  order: number;
  clickable: boolean;
}
