import * as yup from 'yup';

export const purchaseValidationSchema = yup.object().shape({
  certificate: yup.string().required(),
  user_id: yup.string().nullable(),
  star_id: yup.string().nullable(),
});
