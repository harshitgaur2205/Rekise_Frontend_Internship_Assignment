import React from 'react'

const topdiv = () => {
    return (
        <div className='upper_div'>
            <div className='upper_content'>
                <div >
                    <h2>Starting</h2>
                    <br />
                    <div>
                        <p>Lat:22.1697</p>
                        <p>Long:91.4996</p>
                    </div>
                </div>
                <div style={{display:"flex" , alignItems:"center" , gap:"10px"}}>
                    <h2 style={{color:"blue"}}>Speed:</h2><p style={{color:"blue"}}>20kmph</p>

                </div>
                <div>
                    <div>
                        <h2>Ending</h2>
                        <br />
                        <div>
                            <p>Lat:22.2637</p>
                            <p>Long:91.7159</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default topdiv
