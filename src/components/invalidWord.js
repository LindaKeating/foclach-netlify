const InvalidWordMessage = (props ) => {
    const isInvalidWord = props.isInvalidWord
    if(isInvalidWord) {
        return <div className="invalidWordContainer">Níl {props.word} sa stór focal 😿</div>
    } else {
        return <div className="invalidWordContainer"></div>
    }
}

export {InvalidWordMessage as InvalidWord }
