const Message = (props ) => {
    const isVisible = props.messageVisible
    if(isVisible) {
        return <div className="invalidWordContainer">{ props.message }</div>
    } else {
        return <div className="invalidWordContainer"></div>
    }
}

export { Message }
