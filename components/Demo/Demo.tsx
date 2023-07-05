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

const defaultRules = {
  type: 'ERC20',
  chainId: 1, // Ethereum
  minToken: '1',
  contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7', // Token Tether USD
  roleId: '001',
};
const Demo = () => {
  const { address } = useAccount();

  const formik = useFormik({
    initialValues: {
      address: address,
      chainId: defaultRules.chainId,
      type: defaultRules.type,
      contractAddress: defaultRules.contractAddress,
      minToken: defaultRules.minToken,
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
        process.env.NEXT_PUBLIC_COLLAB_LAND_API_KE || ''
      );
    },
  });
  const { checkRoles, isLoading, result, error } = useContext(TokenGateContext);

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
              borderRadius={14}
              marginBottom={4}
              _placeholder={{ color: '#2A6462' }}
              textColor={'#74FBF7'}
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
              borderRadius={14}
              marginBottom={4}
              _placeholder={{ color: '#2A6462' }}
              textColor={'#74FBF7'}
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
              borderRadius={14}
              marginBottom={4}
              _placeholder={{ color: '#2A6462' }}
              textColor={'#74FBF7'}
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
              borderRadius={14}
              marginBottom={4}
              _placeholder={{ color: '#2A6462' }}
              textColor={'#74FBF7'}
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
              borderRadius={14}
              marginBottom={4}
              _placeholder={{ color: '#2A6462' }}
              textColor={'#74FBF7'}
            />

            {/* <FormLabel htmlFor="maxToken">Maximum Tokens in Wallet (optional)</FormLabel>
            <Input
              id="maxToken"
              name="maxToken"
              type="number"
              placeholder="Enter Maximum Tokens in Wallet (optional)"
              onChange={formik.handleChange}
              value={formik.values.maxToken}
              disabled={isLoading}
              variant="filled"
              borderRadius={14}
              marginBottom={4}
              _placeholder={{ color: '#2A6462' }}
              textColor={'#74FBF7'}

              
            /> */}
          </FormControl>
          <Button
            type="submit"
            colorScheme="green"
            width="fit-content"
            isLoading={isLoading}
            backgroundColor={'#2A6462'}
            paddingX={10}
            borderRadius={14}
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
