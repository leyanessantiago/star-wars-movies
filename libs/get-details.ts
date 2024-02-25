import { fetchDetails, getNeedPollingData } from '@/libs/api';
import { isValidURL } from '@/libs/utils/valid-url';
import { CATEGORY_FIELDS } from '@/constants/category-fields';

export function findNeedPollingData(data: any, category: string) {
  const needPollingData: any = {};
  for (const [key, value] of Object.entries(data)) {
    let needPolling = false;
    if(Array.isArray(value) && value.length > 0) {
      needPolling = value.some((v: string) => isValidURL(v) && !v.includes(category));
    } else {
      needPolling = isValidURL(value as string) && !(value as string).includes(category);
    }

    if(needPolling) {
      needPollingData[key] = value;
    }
  }
  return needPollingData;
}

export async function getDetails(category: string, url: string) {
  const data = await fetchDetails(url);
  const needPollingData = findNeedPollingData(data, category);

  let details: any = {};
  for (const field of CATEGORY_FIELDS[category as keyof typeof CATEGORY_FIELDS]) {
    details[field] = data[field];
  }

  for (const [key, value] of Object.entries(needPollingData)) {
    const names = await getNeedPollingData(Array.isArray(value) ? value : [value]);
    details[key] = names;
  }

  return details;
}
