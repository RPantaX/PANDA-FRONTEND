import PropTypes from 'prop-types';

export const RowItemView = ({ id, descripcion, precioUnitario, cantidad, handlerDeleteItem }) => {

    return (
        <>
            <tr>
                <td>{descripcion}</td>
                <td>{precioUnitario}</td>
                <td>{cantidad}</td>
                <td><button
                    className='btn btn-danger'
                    onClick={() => handlerDeleteItem(id)}>eliminar</button></td>
            </tr>
        </>
    )
}

RowItemView.propTypes = {
    descripcion: PropTypes.string.isRequired,
    precioUnitario: PropTypes.number.isRequired,
    cantidad: PropTypes.number.isRequired,
}