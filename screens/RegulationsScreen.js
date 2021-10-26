import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MyHeaderIcon from "../components/MyHeaderIcon";

import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import DummyItem from "../components/DummyItem";
import Card from "../components/Card";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";

const RegulationsScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.listContainer}>
        <View style={styles.titleContainer}>
          <Ionicons name="ios-checkbox-outline" size={70} color="black" />
          <TitleText>Battery Regulations</TitleText>
          <BodyText>
            {"\n"}
            <TitleText>1. แบตเตอรี่อมารอน </TitleText>
            {"\n"}
            {"\n"}
            รับประกันคุณภาพสินค้า เฉพาะแบตเตอรี่ที่เสียหาย
            อันเกิดจากความบกพร่องของโรงงานผู้ผลิต ในช่วงเวลารับประกัน
            โดยนับจากวันที่ติดตั้ง สำหรับรถยนต์ทั่วไป รับประกัน 1 – 2 ปี หรือ
            สำหรับรถใช้งานเพื่อการพาณิชย์ รับประกัน 6 เดือน {"\n"}
            1. ในการเคลมสินค้ากับผู้แทนจำหน่ายแบตเตอรี่อมารอน
            ต้องนำบัตรประกันที่มีตราประทับของร้านค้า หรือ ตัวแทนจำหน่ายมาแสดง{" "}
            {"\n"}
            2. บัตรรับประกันสินค้าสูญหาย บริษัทจะไม่ออกให้ใหม่และการรับประกัน
            ไม่สามารถโอนเปลี่ยนมือได้ {"\n"}
            {"\n"}
            <TitleText>2. ข้อยกเว้นการรับประกัน {"\n"}</TitleText>
            {"\n"}
            1. เลขบาร์โค้ดของแบตเตอรี่ ถูกทำลายเลือนหาย, ถูกเปลี่ยนแปลงแก้ไข,
            ถูกลบ หรือถูกดึงออก {"\n"}
            2. ความเสียหาย อันเกิดจากการไม่ปฏิบัติตามคำแนะนำในการใช้,
            การประมาทเลินเล่อ, เกิดอุบัติเหตุแก่สินค้า เช่น
            สินค้าตกกระแทกจนเสียหาย, ขาดการบำรุงรักษา, เกิดอุบัติเหตุแก่สินค้า
            ซึ่งเกิดจากการกระทำของผู้ซื้อ, ไฟไหม้, น้ำท่วม และภัยธรรมชาติอื่นๆ{" "}
            {"\n"}
            3. แบตเตอรี่ถูกติดตั้ง หรือดูแลรักษาไม่ตรงกับคำแนะนำจากผู้ผลิต{" "}
            {"\n"}
            4. แบตเตอรี่ถูกเก็บไว้ในสต็อกร้านค้า เกินกว่า 3 เดือน {"\n"}
            5. แบตเตอรี่ถูกดัดแปลงสภาพ ผิดไปจากข้อกำหนดโรงงาน {"\n"}
            6. เมื่อบัตรรับประกันไม่สมบรูณ์, ฉีดขาด, ถูกทำลาย {"\n"}
            หรือถูกแก้ไขเปลี่ยนแปลง {"\n"}
            {"\n"}
            <TitleText>3. การรับประกันไม่รวมถึง {"\n"}</TitleText>
            {"\n"}
            1. แบตเตอรี่เสียหาย
            เนื่องมาจากอุปกรณ์ส่วนอื่นของ รถยนต์ ทำงานบกพร่อง {"\n"}
            2. ต้นทุนในการนำแบตเตอรี่ กลับมาเปลี่ยนหรือคืนที่ร้านตัวแทนจำหน่าย {"\n"}
            3. ค่าแรงในการถอด หรือเปลี่ยนแบตเตอรี่ {"\n"}
            4. ความเสียหายอื่นๆ ที่ตามมา {"\n"}
            {"\n"}
            <TitleText>4. บัตรรับประกันจะไม่มีผล ถ้าไม่ระบุข้อมูลให้ถูกต้องและครบถ้วน </TitleText>
            {"\n"}
            {"\n"}
            1. หากเกิดปัญหากับแบตเตอรี่สามารถติดต่อได้ที่ตัวแทนจำหน่ายที่ติดตั้งหรือซื้อแบตเตอรี่
          </BodyText>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.accentColor2,
    paddingVertical: 15,
  },
  listContainer: {
    flex: 1,
    paddingVertical: 20,
    width: "90%",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  titleContainer: {
    alignItems: "center",
    padding: 10,
    marginVertical: 15,
    backgroundColor: "white",
    borderRadius: 5,
  },
});

export default RegulationsScreen;
