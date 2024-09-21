import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Stack, Fade, Portal } from '@mui/material';
// hooks
import useActiveLink from '../../../../hooks/useActiveLink';
//
import { NavItemProps } from '../types';
import { NavItem, /* NavItemDashboard */ } from './NavItem';
import { StyledSubheader, StyledMenu } from './styles';

// ----------------------------------------------------------------------

type NavListProps = {
  item: NavItemProps;
  isOffset: boolean;
};

export default function NavList({ item, isOffset }: NavListProps) {
  const { pathname } = useRouter();

  const [openMenu, setOpenMenu] = useState(false);

  const { path, children } = item;

  const { active } = useActiveLink(path);

  useEffect(() => {
    if (openMenu) {
      handleCloseMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenMenu = () => {
    if (children) {
      setOpenMenu(true);
    }
  };

  const handleCloseMenu = () => {
    if (!active) {
      setOpenMenu(false);
    }
  };

  return (
    <>
      <NavItem
        item={item}
        isOffset={isOffset}
        active={active}
        open={openMenu}
        onMouseEnter={handleOpenMenu}
        onMouseLeave={handleCloseMenu}
      />

      {!!children && openMenu && (
        <Portal>
          <Fade in={openMenu}>
            <StyledMenu onMouseEnter={handleOpenMenu} onMouseLeave={handleCloseMenu}>
              {children.map((list) => (
                <NavSubList
                  key={list.subheader}
                  subheader={list.subheader}
                  items={list.items}
                  onClose={handleCloseMenu}
                />
              ))}
            </StyledMenu>
          </Fade>
        </Portal>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type NavSubListProps = {
  subheader: string;
  items: NavItemProps[];
  onClose: VoidFunction;
};

function NavSubList({ items, subheader, onClose }: NavSubListProps) {
  const { pathname } = useRouter();

  const isActive = (path: string) => pathname === path;

  return (
    <Stack spacing={2.5} gridColumn="span 2" alignItems="flex-start" direction="row">
      <StyledSubheader disableSticky>{subheader}</StyledSubheader>
      {items.map((item) => (
        <NavItem
          subItem
          key={item.title}
          item={item}
          active={isActive(item.path)}
          onClick={onClose}
        />
      ))}
    </Stack>
  );
}
