import React from 'react'
import LoadingBar from 'react-top-loading-bar';


export default function Loader(props) {
    return (
        <LoadingBar
            className='loadingbar'
            color='#f11946'
            progress={props.progress}
            onLoaderFinished={() => { props.progressfunc(0) }}
        ></LoadingBar>
    )
}
