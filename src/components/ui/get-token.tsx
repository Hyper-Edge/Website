import cn from 'classnames';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tab, TabPanels, TabPanel } from '@/components/ui/tab';
import { ChevronDown } from '@/components/icons/chevron-down';
import { coinList } from '@/data/static/coin-list';
import Button from '@/components/ui/button';
import { IconUSFlag } from '@/components/icons/icon-us-flag';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import CoinListBox from '@/components/ui/coin-listbox';
import Erc721Table from '../tokens/erc721-table';
import Erc20Table from '../tokens/erc20-table';
import Erc1155Table from '../tokens/erc1155-table';

const tabMenu = [
  {
    title: 'ERC 20',
    path: 'ERC 20',
  },
  {
    title: 'ERC 721',
    path: 'ERC 721',
  },
  {
    title: 'ERC 1155',
    path: 'ERC 1155',
  },
];

function TabItem({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <Tab
      className={({ selected }) =>
        cn(
          'relative z-0 uppercase tracking-wider hover:text-gray-900 focus:outline-none dark:hover:text-white',
          {
            'font-medium text-white hover:text-white focus:text-white':
              selected,
          },
          className
        )
      }
    >
      {({ selected }) => (
        <>
          <span className="flex w-full justify-between px-3 md:px-0">
            {children}
          </span>
          {selected && (
            <motion.span
              className={cn(
                'absolute bottom-0 left-0 right-0 -z-[1] h-full w-full rounded-lg bg-brand shadow-button'
              )}
              layoutId="activeTabIndicator"
            />
          )}
        </>
      )}
    </Tab>
  );
}

type CoinTransactionProps = {
  transactionType: string;
};

export default function GetToken({
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();
  const dropdownEl = useRef<HTMLDivElement>(null);
  let [selectedTabIndex, setSelectedTabIndex] = useState(0);
  let [visibleMobileMenu, setVisibleMobileMenu] = useState(false);

  return (
    <div className={cn(className)}>
      <Tab.Group
        selectedIndex={selectedTabIndex}
        onChange={(index) => setSelectedTabIndex(index)}
      >
        <Tab.List className="relative mb-6 text-sm uppercase sm:gap-8 sm:rounded-none">
          {isMounted && ['xs', 'sm', 'xl'].indexOf(breakpoint) !== -1 ? (
            <div
              ref={dropdownEl}
              className="rounded-lg border-2 border-gray-200 dark:border-gray-700"
            >
              <button
                onClick={() => setVisibleMobileMenu(!visibleMobileMenu)}
                className="flex w-full items-center justify-between py-2.5 px-4 uppercase text-gray-400 dark:text-gray-300 sm:px-5 sm:py-3.5"
              >
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {tabMenu[selectedTabIndex].title}
                </span>
                <ChevronDown className="h-auto w-3.5" />
              </button>
              <div
                className={cn(
                  'absolute top-full left-0 z-10 mt-1 grid w-full gap-0.5 rounded-lg border border-gray-200 bg-white p-2 text-left shadow-large dark:border-gray-700 dark:bg-gray-800 xs:gap-1',
                  visibleMobileMenu
                    ? 'visible opacity-100'
                    : 'invisible opacity-0'
                )}
              >
                {tabMenu.map((item) => (
                  <div
                    key={item.path}
                    onClick={() => setVisibleMobileMenu(false)}
                  >
                    <TabItem className="w-full p-2.5">{item.title}</TabItem>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex gap-2 2xl:gap-0.5 3xl:gap-2">
              {tabMenu.map((item) => (
                <TabItem key={item.path} className="py-[5px] px-3">
                  {item.title}
                </TabItem>
              ))}
            </div>
          )}
        </Tab.List>
        <span className="my-6 block h-[1px] border-b border-dashed border-b-gray-200 dark:border-b-gray-700"></span>
        <TabPanels>
          <TabPanel className="relative w-full focus:outline-none md:w-auto">
            <Erc721Table />
          </TabPanel>
          <TabPanel className="focus:outline-none">
            <Erc20Table />
          </TabPanel>
          <TabPanel className="focus:outline-none">
            <Erc1155Table />
          </TabPanel>
        </TabPanels>
      </Tab.Group>
    </div>
  );
}
