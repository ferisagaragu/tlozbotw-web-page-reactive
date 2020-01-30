import React from 'react';
import { BurgerElement, BurgerSubElement, FontAwesomeIcon, key } from "reactive";

export const navMenu: Array<BurgerElement> = [
  new BurgerElement({
    uid: key(),
    name: <label>Reactive Components</label>
  })
];