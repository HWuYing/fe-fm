export const COMPANY_TYPE = {
  ENTERPRISE: { label: '装企', value: '3' },
  SERVICE_PROVIDER: { label: '服务商', value: '6' },
};

export const COMPANY_STATUS = {
  THROUGH_AUDIT: { label: '通过审核', value: '1' },
  WAIT_AUDIT: { label: '待审核', value: '10' },
  FAILURE_AUDIT: { label: '未通过审核', value: '2' },
};

// 装企等级
export const COMPANY_LEVEL = {
  AA: { index: 0, value: '4', label: 'A+级' },
  A: { index: 1, value: '3', label: 'A级' },
  B: { index: 2, value: '2', label: 'B级' },
  C: { index: 3, value: '1', label: 'C级' },
};

// 服务商类型
export const SERVER_COMPANY_TYPE = {
  HOUSE_DEVELOPER: { value: '61', label: '房企' },
  PROPERTY: { value: '62', label: '物企' },
};
