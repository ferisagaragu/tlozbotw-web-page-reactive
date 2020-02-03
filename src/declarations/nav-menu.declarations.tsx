import React from 'react';
import { BurgerElement, BurgerSubElement, FontAwesomeIcon, key } from "reactive";

export const navMenu: Array<BurgerElement> = [
  new BurgerElement({
    uid: key(),
    link: '/data',
    name: <label>Reactive Components</label>
  })
];