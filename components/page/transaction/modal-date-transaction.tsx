import CustomText from "@/components/custom-text";
import ModalKuvera from "@/components/modal-bottom";
import { Colors } from "@/constants/theme";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Octicons from "@expo/vector-icons/Octicons";
import moment from 'moment';
import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { CalendarList, DateData } from 'react-native-calendars';
import { MarkedDates } from "react-native-calendars/src/types";
import { modalStyles } from "../../input/date-time-input/style";

export interface DatePickerProps {
  onSelectDate: (value: string) => void;
  style?: ViewStyle;
  label: string;
  value: string;
  titleStyle?: TextStyle;
}

interface RangeState {
  start: string | null;
  end: string | null;
  marked: MarkedDates;
}

const DatePicker: React.FunctionComponent<DatePickerProps> = (props) => {
  const { value, label, onSelectDate, style, titleStyle } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [textDate, setTextDate] = useState(value);

  useEffect(() => {
    switch (value) {
      case "30lastday":
        setTextDate("30 Hari Terakhir");
        break;
      case "7lastday":
        setTextDate("7 Hari Terakhir");
        break;
      case "1lastyear":
        setTextDate("1 Tahun Terakhir");
        break;
      default:
        setTextDate(value);
        break;
    }
  }, [value]);

  // For Modal
  const handleOnFocus = () => {
    setIsModalVisible(true);
  };

  const handleSubmit = (valueDate: string) => {
    onSelectDate(`${valueDate}`);
    onClose();
  };

  const onClose = () => {
    setIsModalVisible(false);
    setShowPicker(false);
  };
  // End For Modal

  const showAndroidPicker = () => {
    setShowPicker(true);
  };

  // State untuk menyimpan tanggal Mulai dan Akhir
  const initialRange = { start: null, end: null, marked: {} };
  const [range, setRange] = useState<RangeState>(initialRange);

  // Warna yang digunakan untuk range
  const RANGE_COLOR = '#70d7c7';
  const START_END_COLOR = '#50cebb';

  // --- FUNGSI UTAMA ---
  const handleDayPress = useCallback((day: DateData) => {
    const dateString = day.dateString;
    let newRange: RangeState = { start: range.start, end: range.end, marked: {} };

    if (!range.start || (range.start && range.end)) {
      // Kasus 1: Belum ada start atau sudah ada range penuh -> Mulai baru
      newRange.start = dateString;
      newRange.end = null;
      newRange.marked = {
        [dateString]: { startingDay: true, color: START_END_COLOR, textColor: 'white' },
      };
    } else {
      // Kasus 2: Sudah ada start -> Tetapkan end
      const startMoment = moment(range.start);
      const endMoment = moment(dateString);

      if (endMoment.isBefore(startMoment)) {
        // Jika End sebelum Start -> Ganti Start
        newRange.start = dateString;
        newRange.end = null;
        newRange.marked = {
          [dateString]: { startingDay: true, color: START_END_COLOR, textColor: 'white' },
        };
      } else {
        // Pilihan End yang Valid
        newRange.end = dateString;
        let date = startMoment.clone();

        // Loop untuk mengisi tanggal di antara start dan end
        while (date.isSameOrBefore(endMoment)) {
          const currentDay = date.format('YYYY-MM-DD');

          if (currentDay === newRange.start) {
            newRange.marked[currentDay] = { startingDay: true, color: START_END_COLOR, textColor: 'white' };
          } else if (currentDay === newRange.end) {
            newRange.marked[currentDay] = { endingDay: true, color: START_END_COLOR, textColor: 'white' };
          } else {
            newRange.marked[currentDay] = { color: RANGE_COLOR, textColor: 'white' };
          }
          date.add(1, 'days');
        }
      }
    }

    setRange(newRange);
  }, [range.start, range.end]); // Dependencies untuk useCallback

  const lastDayOfCurrentMonth = moment().format('YYYY-MM-DD');
  const renderPicker = () => {
    return (
      <>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              if (range.start && range.end) {
                handleSubmit(`${moment(range.start).format('DD-MM-YYYY')} - ${moment(range.end).format('DD-MM-YYYY')}`)
                setRange(initialRange)
              } else {
                onClose();
              }
            }}
            style={{ borderWidth: 1, borderColor: Colors.tealKuvera, borderRadius: 4, paddingVertical: 2, paddingHorizontal: 12 }}>
            <CustomText style={{ color: Colors.tealKuvera, fontWeight: 500 }}>Selesai</CustomText>
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 10, marginBottom: 80 }}>
          <CalendarList
            animateScroll={false}
            calendarStyle={{ width: '100%', paddingTop: 0 }}
            maxDate={lastDayOfCurrentMonth}
            futureScrollRange={0}
            markingType='period'
            markedDates={range.marked}
            onDayPress={handleDayPress}
            theme={{
              textDayFontSize: 14,
              selectedDayBackgroundColor: Colors.tealKuvera,
              selectedDayTextColor: 'white',
              todayTextColor: Colors.tealKuvera,
              arrowColor: Colors.tealKuvera,
            }}
          />
        </View>
      </>
    )
  }


  const renderModalContent = () => {
    return (
      <>
        {showPicker ? renderPicker() : (
          <View style={styles.tabContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                handleSubmit('7lastday')
              }
              }
              style={[styles.tab]}
            >
              <CustomText style={{ fontSize: 15, fontWeight: 500 }}>
                7 Hari terakhir
              </CustomText>
              {value === '7lastday' && (
                <Octicons name="check" size={24} color={Colors.tealDarkKuvera} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                handleSubmit('30lastday')
              }
              }
              style={[styles.tab]}
            >
              <CustomText style={{ fontSize: 15, fontWeight: 500 }}>
                30 Hari terakhir
              </CustomText>
              {value === '30lastday' && (
                <Octicons name="check" size={24} color={Colors.tealDarkKuvera} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                handleSubmit('1lastyear')
              }
              }
              style={[styles.tab]}
            >
              <CustomText style={{ fontSize: 15, fontWeight: 500 }}>
                1 Tahun terakhir
              </CustomText>
              {value === '1lastyear' && (
                <Octicons name="check" size={24} color={Colors.tealDarkKuvera} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => showAndroidPicker()
              }
              style={[{ marginTop: 10, padding: 10 }]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Entypo name="calendar" size={20} color={Colors.grey[700]} />
                  <CustomText style={{ fontSize: 15, fontWeight: 500 }}>
                    Select periode
                  </CustomText>
                </View>
                <FontAwesome6 name="angle-right" size={18} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </>
    )
  };
  // End for date time picker

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.6}
        style={[style, { flexDirection: "row", gap: 4, alignItems: "center" }]}
        onPress={handleOnFocus}
      >
        <CustomText style={titleStyle}>{textDate}</CustomText>
        <Octicons name="chevron-down" size={20} color="black" />
      </TouchableOpacity>
      <ModalKuvera
        title={label}
        isModalVisible={isModalVisible}
        setIsModalVisible={onClose}
      >
        <View style={modalStyles.container}>{renderModalContent()}</View>
      </ModalKuvera>
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  tabContainer: {},
  tab: {
    padding: 10,
    borderBottomColor: Colors.grey[100],
    borderBottomWidth: 1,
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
});

