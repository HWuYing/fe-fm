/* eslint-disable no-undef */
/* eslint-disable no-unused-vars  */
import { API_VERSION } from '../../config';

export const getSkuList = `/good/w/api/sku/${API_VERSION}/queryPage`;
export const queryCategory = `/good/w/api/category/${API_VERSION}/queryList`;
export const queryThirdCategory = `/good/w/api/category/${API_VERSION}/queryThreeList`;
export const queryBrands = `/good/w/api/brand/${API_VERSION}/queryList`;

export const queryRegion = `/config/w/api/region/${API_VERSION}/childListTree?parentId=`;

export const queryBudgetArea = `/decoration/w/api/dict/${API_VERSION}/list/HOUSE_BUDGET`;
export const queryHousingType = `/decoration/w/api/dict/${API_VERSION}/list/HOUSING_TYPE`;
export const queryHousingStyle = `/decoration/w/api/dict/${API_VERSION}/list/HOUSING_STYLE`;
export const queryDecorationType = `/decoration/w/api/dict/${API_VERSION}/list/DECORATION_TYPE`;
export const queryPropertyType = `/decoration/w/api/dict/${API_VERSION}/list/HOUSING_PROPERTY`;
export const queryHousingSpecifications = `/decoration/w/api/dict/${API_VERSION}/list/HOUSE_MODEL`;
export const queryStoreList = `/user/w/api/store/${API_VERSION}/list`;
export const queryFrontCategory = `/good/w/api/category/front/${API_VERSION}/queryList`;

export const queryPageUICategory = `/config/w/api/uiComponent/${API_VERSION}/query`;
