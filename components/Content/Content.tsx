import { Container, Text } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import Demo from '../Demo/Demo';
import Image from 'next/image';
import * as S from './Content.styled';

const Content = () => {
  const { isConnected } = useAccount();

  return (
    <S.Container className="py-3">
      <S.CollabMascote
        src="/collab.land-mascote.svg"
        width={554}
        height={677}
        alt="Collab.land mascot"
      />
      <Container maxW="xl" rounded="md">
        {isConnected ? (
          <>
            <Text fontSize="3xl">Fill the form below!</Text>
            <Demo />
          </>
        ) : (
          <Text fontSize="3xl">Please connect your wallet</Text>
        )}
      </Container>
    </S.Container>
  );
};

export default Content;
