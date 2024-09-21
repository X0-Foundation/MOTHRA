import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

type ReturnType = {
  active: boolean;
  isExternalLink: boolean;
};

export default function useActiveLink(path: string, deep = true): ReturnType {
  const { pathname, asPath } = useRouter();

  const checkPath = path.startsWith('#');

  let currentPath = path === '/' ? '/' : `${path}/`;
  if(path.includes("?")) {
    currentPath = currentPath.split("?")[0];
  }

  const normalActive =
    (!checkPath && pathname === currentPath) || (!checkPath && asPath === currentPath);

  const deepActive =
    (!checkPath && pathname.includes(currentPath)) || (!checkPath && asPath.includes(currentPath));

  return {
    active: deep ? deepActive : normalActive,
    isExternalLink: path.includes('http'),
  };
}
