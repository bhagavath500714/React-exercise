import React from 'react'

function ErrorMsg({formik, field, style, touched = true, touchedField}) {
    const touchedCondition = !touched || formik.touched[touchedField || field];
    return touchedCondition && formik.errors[field] ? (
      <div style={{fontWeight: 'normal', color: '#dc3545', marginTop: 10}}>{formik.errors[field]}</div>
    ) : null;
}

export default ErrorMsg
