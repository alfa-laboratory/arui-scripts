/**
 * Vendor
 */

import React from 'react';

/**
 * Styles
 */

import styles from './Component.module.css';

/**
 * Types
 */

type IconType = {
  name: 'gear';
  size?: 's' | 'm' | 'l' | 'xl' | string;
  className?: string;
};

/**
 * Exp
 */

export const Icon: React.FC<IconType> = () => (
  <span className='icon gear' />
);
