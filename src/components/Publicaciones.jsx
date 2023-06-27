import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import '../assets/css/publicaciones.css';
import ReactPaginate from 'react-paginate';

export default function Publicaciones({ id }) {
    const [publicaciones, setPublicaciones] = useState([]);
    //const [compras, setCompras] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const ITEMS_PER_PAGE = 5;
    const userId = id[0];
    const userType = id[1]
    console.log(userId);
    console.log(userType);

    useEffect(() => {
        async function fetchData() {
            if (userType === 'vendedor') {
                try {
                    const response = await fetch("https://backmarketdb.fly.dev/productos/mostrar/" + userId);
                    const data = await response.json();
                    setPublicaciones([...data]);
                    console.log(data);
                } catch (error) {
                    console.error("Error fetching prooducts:", error);
                }
            } else if (userType === "usuario") {
                try {
                    const response = await fetch("https://backmarketdb.fly.dev/compras/listadobyUser/" + userId);
                    const data = await response.json();
                    console.log(data);
                    setPublicaciones([...data]);
                    console.log(publicaciones);
                } catch (error) {
                    console.error("Error fetching prooducts:", error);
                }
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [setPublicaciones]);

    return (
        <>
            <Table striped bordered hover style={{ backgroundColor: "lightblue", opacity: "0,5", borderRadius: "20px", overflow: "hidden" }}>
                {userType === "vendedor" ?
                    <thead>
                        <tr>
                            <th>Id Producto</th>
                            <th>Nombre</th>
                            <th>Marca</th>
                            <th>Precio</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    :
                    <thead>
                        <tr>
                            <th>Número de Orden</th>
                            <th>Fecha</th>
                            <th>Dirección Entrega</th>
                            <th>Cantidad Productos</th>
                            <th>Valor Boleta</th>
                        </tr>
                    </thead>
                }
                {userType === "vendedor" ?
                    <tbody>
                        {publicaciones.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE).map((publicacion) => (
                            <tr key={publicacion.id_producto}>
                                <td>{publicacion.id_producto}</td>
                                <td>{publicacion.nombre}</td>
                                <td>{publicacion.marca}</td>
                                <td>{new Intl.NumberFormat('es-CL', { currency: 'CLP', style: 'currency' }).format(publicacion.precio)}</td>
                                <td>{publicacion.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                    :
                    <tbody>

                        {publicaciones.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE).map((publicacion) => {
                            const { productos } = publicacion;
                            const cantidad = productos.length;
                            const precio = productos.reduce((total, producto) => total + producto.precio, 0);
                            const fechaFormateada = new Date(publicacion.fecha).toLocaleDateString('es-CL');

                            return (
                                <tr key={publicacion.id_compra}>
                                    <td>{publicacion.id_compra}</td>
                                    <td>{fechaFormateada}</td>
                                    <td>{publicacion.direccion}</td>
                                    <td>{cantidad}</td>
                                    <td>{new Intl.NumberFormat('es-CL', { currency: 'CLP', style: 'currency' }).format(precio)}</td>
                                </tr>
                            );
                        })}

                    </tbody>
                }
            </Table>
            <div>
                <ReactPaginate
                    previousLabel={'Anterior'}
                    nextLabel={'Siguiente'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(publicaciones.length / ITEMS_PER_PAGE)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={(data) => {
                        setCurrentPage(data.selected);
                    }}
                    containerClassName={'pagination justify-content-center'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    activeClassName={'active'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                />
            </div>
        </>);
}