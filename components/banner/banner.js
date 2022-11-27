import style from './banner.module.css'


const Banner = (props)=>{
    return (
        <div className={style.container}> 
        <h1 className={style.title}>
            <span className={style.title1}>Coffee</span>
            <span className={style.title2}>Connesior</span>
        </h1>
        <p className={style.subTitle}>This is subtitle</p>
        <button className={style.button} onClick={props.handleClick}> {props.text}</button>
        </div>
    )
}


export default Banner