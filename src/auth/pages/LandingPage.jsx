import React from 'react'

import '../style/landingPage.css'

export const LandingPage = () => {
    return (
        <section className='landing-card'>
            {/* HomePage */}
            <div className='text-landing-card'>
                <h2>todo</h2>
                <h3>or not todo</h3>
                <p>
                    Maybe you can put your things Todo or maybe not,
                    whatever... Easy and supereasy, you only have Todo it.
                </p>
            </div>

            <div className='img-landing-card'>
                <img src="../../../public/Login_imagen.png" alt="img_check" />
            </div>

        </section>
    )
}
