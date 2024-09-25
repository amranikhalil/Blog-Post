'use client'
import {useState} from 'react';
import clsx from 'clsx';
import { Rss, Sun, Moon, LogOut } from 'react-feather';
import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';
import styles from './Header.module.css';
import Cookie from 'js-cookie';
import { LIGHT_TOKENS, DARK_TOKENS } from '@/constants';

function Header({ initheme, className, ...delegated }) {

  const [theme,setTheme]=useState(initheme)

  const toggleMode=()=> {
    const newtheme = 
      theme=== 'light'? 'dark':'light'

     Cookie.set('color-theme', newtheme,{
      expires:1000
    })
    setTheme(newtheme)
    console.log(theme)

  }
  const newToken= theme=== 'light'? LIGHT_TOKENS:DARK_TOKENS
  const root= document.documentElement
  Object.entries(newToken).forEach(([key,value])=>{
    root.style.setProperty(key,value)
  })
  return (
    <header
      className={clsx(styles.wrapper, className)}
      {...delegated}
    >
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>
            View RSS feed
          </VisuallyHidden>
        </button>
        <button className={styles.action}
          onClick={()=>toggleMode()}
        >
          {
            theme==='light'?(
              <>
              <Sun size="1.5rem" />
              <VisuallyHidden>
                Toggle dark / light mode
              </VisuallyHidden>
              </>
            ):
            <>
            <Moon size="1.5rem" />
            <VisuallyHidden>
              Toggle dark / light mode
            </VisuallyHidden>
            </>
          }
       
        </button>
      </div>
    </header>
  );
}

export default Header;
