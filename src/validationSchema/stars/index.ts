import * as yup from 'yup';

export const starValidationSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().integer().required(),
  organization_id: yup.string().nullable(),
});
