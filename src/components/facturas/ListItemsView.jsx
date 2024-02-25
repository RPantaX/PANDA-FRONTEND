import { RowItemView } from "./RowItemView"
import PropTypes from 'prop-types';

export const ListItemsView = ({title, items, handlerDeleteItem}) => {

    return (
        <>
        
            <h4>{ title }</h4>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(({ id, descripcion, precioUnitario, cantidad }) => (
                        <RowItemView
                            key={id}
                            id={id}
                            descripcion={descripcion}
                            precioUnitario={precioUnitario}
                            cantidad={cantidad}
                            handlerDeleteItem={id => handlerDeleteItem(id)}
                        />
                    ))}
                </tbody>
            </table>
            
        </>
    )
}

ListItemsView.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
}