import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert,Te } from "react-native";
import { Table, TableWrapper, Row, Cell, Rows, Col } from "react-native-table-component";

export default class TableInvoice extends Component {
  constructor(props) {
    const total = "รวมสุทธิ";
    super(props);
    this.state = {
      tableHead: ["รายการ", "จำนวนเงิน"],
      tableTitle: ["ค่าเช่าห้อง(Room rate)","ค่าน้ำ(Water rate)", "ค่าไฟฟ้า(Electrical rate)", "ค่าส่วนกลาง(dorm free)", "ค่าใช้จ่ายเพิ่มเติม", "เงินรวมก่อนภาษี", "ภาษีมูลค่าเพิ่ม 7 %", total],
      tableData: [
        [ "฿"+props.invoice.dorm_fee.toFixed(2) ],
        [ "฿"+props.invoice.water_fee.toFixed(2) ],
        [ "฿"+props.invoice.electricity_fee.toFixed(2) ],
        [ "฿"+props.invoice.common_fee.toFixed(2)],
        [ "฿"+props.invoice.expenses.toFixed(2)],
        [ "฿"+props.invoice.amount.toFixed(2)],
        [ "฿"+props.invoice.tax.toFixed(2)],
        [ "฿"+props.invoice.total.toFixed(2)],
      ],
    };
  }
  // style={{ ...styles.container, ...{ backgroundColor: props.color } }}
  render() {
    const state = this.state;

    return (
        <View style={{...styles.container}}>
        <Table >
          <Row data={state.tableHead} flexArr={[1,1]} style={{...styles.head}} textStyle={{...styles.textHead}}/>
          <TableWrapper style={{...styles.wrapper}}>
          <Col data={state.tableTitle} style={{...styles.title}} heightArr={[35,35]} textStyle={{...styles.textTiltle}}/>
          <Rows data={state.tableData}  flexArr={[1]} style={{...styles.row}} textStyle={{...styles.text}}>
          </Rows>
          </TableWrapper>
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: { backgroundColor: '#f6f8fa' },
    head: {  height: 40,  backgroundColor: '#e3effa', borderRadius: 5, paddingLeft: 20, },
    textHead: { fontSize: "12px",  textAlign: "center", fontWeight: 'bold'},

    wrapper: { flexDirection: 'row',  },

    title: { flex: 1, backgroundColor: '#f6f8fa',  paddingLeft: 20, },
    textTiltle: { fontSize: "11px", fontWeight: 'bold', }, 
    
    row: {  height: 35, paddingLeft: 5, width: "50%", marginLeft: 8,  borderWidth: 0.3,  borderRadius: 5, borderColor: "#bedefa", margin:2   },
    text: { fontSize: "11px", fontWeight: 'bold', color: '#2D83FC',},
    
   
});
