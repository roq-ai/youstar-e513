import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createPurchase } from 'apiSdk/purchases';
import { Error } from 'components/error';
import { purchaseValidationSchema } from 'validationSchema/purchases';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { StarInterface } from 'interfaces/star';
import { getUsers } from 'apiSdk/users';
import { getStars } from 'apiSdk/stars';
import { PurchaseInterface } from 'interfaces/purchase';

function PurchaseCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PurchaseInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPurchase(values);
      resetForm();
      router.push('/purchases');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PurchaseInterface>({
    initialValues: {
      certificate: '',
      user_id: (router.query.user_id as string) ?? null,
      star_id: (router.query.star_id as string) ?? null,
    },
    validationSchema: purchaseValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Purchase
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="certificate" mb="4" isInvalid={!!formik.errors?.certificate}>
            <FormLabel>Certificate</FormLabel>
            <Input type="text" name="certificate" value={formik.values?.certificate} onChange={formik.handleChange} />
            {formik.errors.certificate && <FormErrorMessage>{formik.errors?.certificate}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<StarInterface>
            formik={formik}
            name={'star_id'}
            label={'Select Star'}
            placeholder={'Select Star'}
            fetcher={getStars}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'purchase',
    operation: AccessOperationEnum.CREATE,
  }),
)(PurchaseCreatePage);
