import React from 'react';
import styles from "./styles.json"

function Header({ theme }) {
    return (
        <header className={styles[theme].macroHeader}>
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    width="64" height="64"
                    viewBox="0 0 72 72">
                    <path d="M56 48c2.209 0 4 1.791 4 4 0 2.209-1.791 4-4 4-1.202 0-38.798 0-40 0-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4C17.202 48 54.798 48 56 48zM56 32c2.209 0 4 1.791 4 4 0 2.209-1.791 4-4 4-1.202 0-38.798 0-40 0-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4C17.202 32 54.798 32 56 32zM56 16c2.209 0 4 1.791 4 4 0 2.209-1.791 4-4 4-1.202 0-38.798 0-40 0-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4C17.202 16 54.798 16 56 16z"></path>
                </svg>
            </button>
            <p className='border-2'>logo</p>
            <button>
                <p className='border-2'>user</p>

            </button>
        </header>
    )
}

export default Header;