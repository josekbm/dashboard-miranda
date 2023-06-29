import { useState } from "react";

const useImput = (initValue) => {
    const[value, setValue] = useState(initValue);

    const rest = () => setValue(initValue);

    const attributeObj = {
        value,
        onChange: (e) => setValue(e.target.value)
    }

    return [value, reset, attributeObj];
}

export default useImput