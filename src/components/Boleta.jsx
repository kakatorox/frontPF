import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
const logo = require('../assets/img/logo-page.png');

const styles = StyleSheet.create({
    imgLogo: {
        width: '25%',
        alignSelf: 'center'
    },
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 60,
        paddingRight: 60,
        paddingBottom: 30,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 40,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    table: {
        display: 'table',
        width: 'auto',
        marginTop: 30,
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
    },
    tableColHeader: {
        width: '15%',
        backgroundColor: '#EDEDED',
        textAlign: 'center',
        borderTop: '1px solid black',
        borderLeft: '1px solid black',
        borderBottom: '1px solid black',
        borderRight: '1px solid black',
        paddingTop: 5,
        paddingBottom: 5,
    },
    tableCol: {
        width: '15%',
        textAlign: 'center',
        borderTop: '1px solid black',
        borderLeft: '1px solid black',
        borderBottom: '1px solid black',
        borderRight: '1px solid black',
        paddingTop: 5,
        paddingBottom: 5,
    },
    tableColDesc: {
        width: '40%',
        textAlign: 'left',
        borderTop: '1px solid black',
        borderLeft: '1px solid black',
        borderBottom: '1px solid black',
        borderRight: '1px solid black',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    tableColTotal: {
        width: '30%',
        textAlign: 'center',
        borderTop: '1px solid black',
        borderLeft: '1px solid black',
        borderBottom: '1px solid black',
        borderRight: '1px solid black',
        paddingTop: 5,
        paddingBottom: 5,
    },
    totalRow: {
        flexDirection: 'row',
        marginTop: 30,
        borderTop: '1px solid black',
        borderBottom: '1px solid black',
        paddingTop: 5,
        paddingBottom: 5,
    },
    totalColDesc: {
        width: '70%',
        textAlign: 'right',
        paddingRight: 10,
    },
    totalColValue: {
        width: '30%',
        textAlign: 'center',
    },
});

export default function BoletaPDF({ datos }) {
    const { cart, cost } = datos;
    return (
        <Document>
            <Page style={styles.page}>
                <Image src={logo} style={styles.imgLogo} />
                <Text style={styles.title}>Boleta de compra</Text>
                <Text style={styles.header}>Fecha: {new Date().toLocaleDateString()}</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>ID Producto</Text>
                        <Text style={styles.tableColDesc}>Nombre</Text>
                        <Text style={styles.tableColHeader}>Precio</Text>
                        <Text style={styles.tableColHeader}>Cantidad</Text>
                        <Text style={styles.tableColHeader}>Total</Text>
                    </View>
                    {cart.map((item) => (
                        <View key={item.id_producto} style={styles.tableRow}>
                            <Text style={styles.tableCol}>{item.id_producto}</Text>
                            <Text style={styles.tableColDesc}>{item.nombre}</Text>
                            <Text style={styles.tableCol}>{new Intl.NumberFormat('es-CL', { currency: 'CLP', style: 'currency' }).format(item.precio)}</Text>
                            <Text style={styles.tableCol}>{item.cantidad}</Text>
                            <Text style={styles.tableCol}>{new Intl.NumberFormat('es-CL', { currency: 'CLP', style: 'currency' }).format(item.cantidad * item.precio)}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.totalRow}>
                    <Text style={[styles.tableColDesc, styles.totalColDesc]}>Total:</Text>
                    <Text style={[styles.tableCol, styles.totalColValue]}>{new Intl.NumberFormat('es-CL', { currency: 'CLP', style: 'currency' }).format(cost)}</Text>
                </View>
            </Page>
        </Document>
    )
}