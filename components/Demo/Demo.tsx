import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { TokenGateContext } from 'collabland-tokengate-react-context';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { useAccount } from 'wagmi';
import * as Yup from 'yup';

const defaultRules = {
  type: 'ERC20',
  chainId: 1, // Ethereum
  minToken: '1',
  contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7', // Token Tether USD
  roleId: '001',
};

const RulesValidationSchema = Yup.object().shape({
  type: Yup.string().required('Required'),
  chainId: Yup.number().required('Required'),
  minToken: Yup.number().positive().required('Required'),
  contractAddress: Yup.string().required('Required'),
  roleId: Yup.string().required('Required'),
});

const Demo = () => {
  const { address } = useAccount();
  const { checkRoles, isLoading, result, error } = useContext(TokenGateContext);

  const formik = useFormik({
    initialValues: {
      address: address,
      chainId: defaultRules.chainId,
      type: defaultRules.type,
      contractAddress: defaultRules.contractAddress,
      minToken: defaultRules.minToken,
      roleId: defaultRules.roleId,
    },
    onSubmit: (values) => {
      checkRoles(
        {
          account: values.address!,
          rules: [
            {
              type: values.type!,
              chainId: values.chainId!,
              minToken: values.minToken!,
              contractAddress: values.contractAddress!,
              roleId: values.roleId,
            },
          ],
        },
        process.env.NEXT_PUBLIC_COLLAB_LAND_API_KEY!
      );
    },
    validationSchema: RulesValidationSchema,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={4} align="flex-start">
          <FormControl isRequired>
            <FormLabel htmlFor="address">Wallet Address</FormLabel>
            <Input
              id="address"
              name="address"
              type="address"
              placeholder="Enter Wallet Address"
              onChange={formik.handleChange}
              value={formik.values.address}
              disabled={isLoading}
              variant="filled"
              marginBottom={4}
            />
            <FormLabel htmlFor="chainId">Chain Id</FormLabel>
            <Input
              id="chainId"
              name="chainId"
              type="number"
              placeholder="Enter Chain ID"
              onChange={formik.handleChange}
              value={formik.values.chainId}
              disabled={isLoading}
              variant="filled"
              marginBottom={4}
            />
            <FormLabel htmlFor="type">Token Type</FormLabel>
            <Input
              id="type"
              name="type"
              type="text"
              placeholder="Enter Token Type"
              onChange={formik.handleChange}
              value={formik.values.type}
              disabled={isLoading}
              variant="filled"
              marginBottom={4}
            />
            <FormLabel htmlFor="contractAddress">
              Token Contract Address
            </FormLabel>
            <Input
              id="contractAddress"
              name="contractAddress"
              type="address"
              placeholder="Enter Token Contract Address"
              onChange={formik.handleChange}
              value={formik.values.contractAddress}
              disabled={isLoading}
              variant="filled"
              marginBottom={4}
            />
            <FormLabel htmlFor="minToken">Minimum Tokens in Wallet</FormLabel>
            <Input
              id="minToken"
              name="minToken"
              type="number"
              placeholder="Enter Minimum Tokens in Wallet"
              onChange={formik.handleChange}
              value={formik.values.minToken}
              disabled={isLoading}
              variant="filled"
              marginBottom={4}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="green"
            width="fit-content"
            isLoading={isLoading}
            backgroundColor={'#2A6462'}
            paddingX={10}
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
      {error && <div className="font-bold text-red-900">Error: {error}</div>}
    </>
  );
};

export default Demo;
