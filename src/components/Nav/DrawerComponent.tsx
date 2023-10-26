import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  Link,
  Text,
} from '@chakra-ui/react';
import { StyledIcon } from '@/components/Nav/Nav.styles';
import Image from 'next/image';
import { useUserContext } from '@/hooks/useUserContext';
import { EmailIcon } from '@chakra-ui/icons';

interface IDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  logout: () => void;
  btnRef: any;
}
const DrawerComponent: React.FC<IDrawerProps> = (props) => {
  const { isOpen, onClose, btnRef, logout } = props;
  const { user } = useUserContext();
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      // btnRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody mt={'50px'}>
          {!user && (
            <Link href={'/login'} display={'flex'} alignItems={'center'} gap={'10px'}>
              <StyledIcon title="Logout">
                <Image src={'/logout.png'} height={20} width={20} alt={''} />
              </StyledIcon>
              Login
            </Link>
          )}
          {user && (
            <Flex flexDirection={'column'} gap={'10px'}>
              <Flex gap={'10px'} alignItems={'center'}>
                <Image src={'/user.png'} height={35} width={35} alt={''}></Image>

                <Text fontSize="md">{user.name}</Text>
                {/*<Text>{user.email}</Text>*/}
              </Flex>
              <Flex gap={'10px'} alignItems={'center'}>
                <EmailIcon color={'#f78f02'} width={'35px'} height={'35px'} />

                <Text fontSize="md">{user.email}</Text>
                {/*<Text>{user.email}</Text>*/}
              </Flex>

              <Link href={'/cart'} display={'flex'} alignItems={'center'} gap={'10px'}>
                <StyledIcon
                  title="Cart"
                  amount={user?.cartItems?.length}
                  data-content={`${user?.cartItems?.length}`}
                >
                  <Image src={'/cart.png'} height={35} width={35} alt={''} />
                </StyledIcon>
                <Text fontSize={'md'}>Cart</Text>
              </Link>
            </Flex>
          )}
        </DrawerBody>
        <DrawerFooter justifyContent={'center'}>
          {user?.isUser && (
            <Flex onClick={logout} alignItems={'center'} gap={'10px'}>
              <StyledIcon title="Logout">
                <Image src={'/logout.png'} height={20} width={20} alt={''} />
              </StyledIcon>
              Logout
            </Flex>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
