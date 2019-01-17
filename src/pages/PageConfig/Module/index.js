import { hasOwnProperty, factory } from '@particulate';

import CustomerMarketing from './CustomerMarking';
import CustomerSlide from './CustomerSlide';
import CustomerUploadImage from './CustomerUploadImage';
// import ImageFloor from './ImageFloor';
import CustomerSelectEntry from './CustomerSelectEntry';

const { batchEntryMap } = factory;

const mapEntry = {
  ...batchEntryMap({
    customerSlide: CustomerSlide,
    // imageFloor: ImageFloor,
    customerUploadImage: CustomerUploadImage,
    customerMarketing: CustomerMarketing,
    customerSelectEntry: CustomerSelectEntry,
  }),
};

function factoryEntryConfig(key, option) {
  if (!hasOwnProperty(mapEntry, key)) {
    throw new Error(`${key} entry is not defined`);
  }
  return mapEntry[key](option);
}

export default factoryEntryConfig;
