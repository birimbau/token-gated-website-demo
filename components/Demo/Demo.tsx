import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { TokenGateContext } from 'collabland-tokengate-react-context';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { useAccount } from 'wagmi';

const Demo = () => {
  const rules = [
    {
      type: 'ERC20',
      chainId: 100,
      minToken: '1',
      contractAddress: '0x712b3d230F3C1c19db860d80619288b1F0BDd0Bd',
      roleId: '001',
    },
  ];
  const { address } = useAccount();
  const formik = useFormik({
    initialValues: {
      address: address,
    },
    onSubmit: (values) => {
      checkRoles(
        {
          account: values.address || '',
          rules: [
            {
              type: 'ERC20',
              chainId: 100,
              minToken: '1',
              contractAddress: '0x712b3d230F3C1c19db860d80619288b1F0BDd0Bd',
              roleId: '001',
            },
          ],
        },
        process.env.NEXT_PUBLIC_COLLAB_LAND_API_KEY || ''
      );
    },
  });
  const { checkRoles, isLoading, result, error } = useContext(TokenGateContext);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={4} align='flex-start'>
          <FormControl>
            <FormLabel htmlFor='address'>Address</FormLabel>
            <Input
              id='address'
              name='address'
              type='address'
              variant='filled'
              onChange={formik.handleChange}
              value={formik.values.address}
              disabled={isLoading}
            />
          </FormControl>
          <Button
            type='submit'
            colorScheme='purple'
            width='full'
            isLoading={isLoading}
          >
            Check Role
          </Button>
        </VStack>
      </form>
      {result?.roles &&
        result?.roles.map((role) => {
          return (
            <div key={role.id}>
              Role:{role.id} - Granted:{String(role.granted)}
            </div>
          );
        })}
      {error && <div className='font-bold text-red-900'>Error: {error}</div>}
    </>
  );
};

export default Demo;
