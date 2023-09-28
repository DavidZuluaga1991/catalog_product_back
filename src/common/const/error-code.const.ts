interface ErrorCodeType {
  [key: string]: number;
}
export const ErrorCode: ErrorCodeType = {
  PRODUCT_COULD_NOT_BE_UPDATED: 409,
  DUPLICATE_PRIMARY_KEY: 409,
  PRODUCT_NOT_FOUND: 404,
};
