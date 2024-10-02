import {
  View,
  TextInput,
  Platform,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {guidelineBaseWidth, scale} from '../utility/screenUitility';
import {RnOtpInputsProps} from '../../types/OtpInputs';
const RnOtpInputs: React.FC<RnOtpInputsProps> = props => {
  const {
    pinCount = 4,
    onSubmit = () => {},
    secureTextEntry = false,
    autoSubmit = false,
    mode = 'rectangle',
    borderRadius = 6,
    onChageValue = () => {},
    bgColor = '#D9E3F6',
    textColor = '#000000',
    borderWidth = 1,
    borderColor = '#A768F1',
    keyboardType = 'number-pad',
    buttonTitle = 'Verify & Proceed',
    Minute = 1,
    Second = 0,
    buttonStyle = styles.buttonStyle,
    onlyResendOtp = false,
    onResendClick = () => {},
    buttonTitleStyle = styles.buttonTitleStyle,
    resendTextStyle = styles.resendTextStyle,
    inputHeightAndWidth = 50,
    isError = false,
    errorMsgStyle = styles.errorMsgStyle,
    errorMsg = 'Invalid OTP.',
    isButtonDisplay = true,
    isResendOtpDisplay = true,
  } = props;
  const inputRef = useRef<TextInput>();
  const [otp, setOtp] = useState<number[]>(
    new Array(pinCount && pinCount <= 6 && pinCount >= 3 ? pinCount : 4).fill(
      '',
    ),
  );
  const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);
  const [minute, setMinute] = useState<number>(Minute);
  const [second, setSecond] = useState<number>(Second);
  const [isResend, setIsResend] = useState<boolean>(false);
  const [iserror, setIserror] = useState<boolean>(isError);
  const [shakeAnimation] = useState<Animated.Value>(new Animated.Value(0));
  /**
   * Starts a shake animation sequence.
   *
   * This function initiates a series of animations that move the shakeAnimation
   * value between 10, -10, and back to 0, creating a shaking effect.
   *
   * @return {void} No return value, animation is started directly.
   */
  const startShake = (): void => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 90,
        useNativeDriver: true,
      }),
    ]).start();
  };
  /**
   * Resets the OTP state and triggers the resend functionality.
   *
   * @return {void} This function does not return any value.
   */
  const ResendHandler = (): void => {
    setOtp(new Array(pinCount).fill(''));
    setIserror(false);
    setActiveOtpIndex(0);
    setIsResend(true);
    onResendClick();
  };
  /**
   * Handles changes to the OTP input fields.
   *
   * Updates the OTP state with the new input value, moves the active index forward or backward based on the input,
   * and triggers the onChageValue callback with the updated OTP value. If autoSubmit is enabled, it also calls the
   * onSubmit callback when the active index reaches the last input field.
   *
   * @param {object} e - The event object containing the input text.
   * @param {number} index - The index of the input field that triggered the change event.
   * @return {void} No return value.
   */
  const ChangeHandler = (
    e: {nativeEvent: {text: string}},
    index: number,
  ): void => {
    const {text} = e.nativeEvent;
    const newOtp: number[] = [...otp];
    newOtp[index] = parseInt(text);
    setOtp(newOtp);
    console.log('otp', otp, newOtp);
    console.log('activeOtpIndex', activeOtpIndex);
    console.log('index', index);
    console.log('text', text);
    text
      ? setActiveOtpIndex(index + 1)
      : index > 0
      ? setActiveOtpIndex(index - 1)
      : null;
    /**
     * ? For AutoSubmit (After Fill All Input we Can call a Fun)
     */
    onChageValue(parseInt(newOtp.join('')));
    autoSubmit
      ? activeOtpIndex === pinCount - 1
        ? onSubmit(parseInt(newOtp.join('')))
        : null
      : null;
  };

  /**
   * Handles key press events for OTP input fields, specifically for backspace and enter keys.
   *
   * @param {object} e - The event object containing information about the key press.
   * @param {number} index - The current index of the OTP input field.
   * @return {void} No return value, the function modifies state directly.
   */
  const OnKeyHandler = (
    e: {nativeEvent: {key: string}},
    index: number,
  ): void => {
    /**
     * ? When Enter BackSpace
     */
    e.nativeEvent.key === 'Backspace' && index > 0
      ? (setActiveOtpIndex(index - 1), setIserror(false))
      : null;

    console.log('OnKeyHandler', activeOtpIndex);
  };

  /**
   * ? For Error hanlder
   */

  useEffect(() => {
    setIserror(isError);
    isError ? startShake() : null;
  }, [isError]);

  /**
   * ? For Dynamic Array
   */
  useEffect(() => {
    setOtp(
      new Array(pinCount && pinCount <= 6 && pinCount >= 3 ? pinCount : 4).fill(
        '',
      ),
    );
  }, [pinCount]);

  /**
   * ? For Focus on each box
   */

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  /**
   * ? For Timer
   */

  useEffect(() => {
    isResend ? (setSecond(Second), setMinute(Minute)) : null;
    const interval = setInterval(() => {
      if (second > 0) {
        setSecond(second - 1);
        setIsResend(false);
      }
      if (second === 0) {
        if (minute === 0) {
          clearInterval(interval);
          setIsResend(false);
        } else {
          setSecond(59);
          setMinute(minute - 1);
          setIsResend(false);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [second, isResend]);
  return (
    <>
      <SafeAreaView>
        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View style={styles.containerWrap}>
              {otp.map((_: any, index: number) => {
                return (
                  <Animated.View
                    key={index}
                    style={{
                      borderBottomWidth: iserror
                        ? borderWidth
                        : mode === 'flat'
                        ? 1
                        : activeOtpIndex === index
                        ? borderWidth
                        : 0,
                      borderWidth: scale(
                        iserror
                          ? borderWidth
                          : mode === 'flat'
                          ? 0
                          : activeOtpIndex === index
                          ? borderWidth
                          : 0,
                      ),
                      borderRadius: scale(
                        mode === 'circle'
                          ? 50
                          : mode === 'flat'
                          ? 0
                          : mode === 'rectangle'
                          ? borderRadius
                          : borderRadius,
                      ),
                      backgroundColor: mode === 'flat' ? '#FFFFFF' : bgColor,
                      marginHorizontal:
                        Platform.isPad || guidelineBaseWidth > 500
                          ? scale(40)
                          : scale(0),
                      marginTop:
                        Platform.isPad || guidelineBaseWidth > 500
                          ? scale(20)
                          : scale(0),

                      padding: scale(0.5),
                      borderColor: iserror ? 'red' : borderColor,
                      transform: [{translateX: shakeAnimation}],
                    }}>
                    <TextInput
                      key={index}
                      ref={index === activeOtpIndex ? inputRef : undefined}
                      autoCorrect={false}
                      value={otp[index]}
                      maxLength={1}
                      keyboardType={keyboardType}
                      editable={true}
                      onChange={(e: any) => ChangeHandler(e, index)}
                      onKeyPress={(e: any) => OnKeyHandler(e, index)}
                      secureTextEntry={secureTextEntry}
                      style={{
                        height: scale(
                          inputHeightAndWidth ??
                            (pinCount === 4
                              ? 50
                              : pinCount === 5
                              ? 55
                              : pinCount === 6
                              ? 45
                              : 50),
                        ),
                        width: scale(
                          inputHeightAndWidth ??
                            (pinCount === 4
                              ? 50
                              : pinCount === 5
                              ? 55
                              : pinCount === 6
                              ? 45
                              : 50),
                        ),
                        textAlign: 'center',
                        fontSize: scale(22),
                        fontWeight: '500',
                        color: textColor,
                        borderRadius: scale(
                          mode === 'circle'
                            ? 50
                            : mode === 'flat'
                            ? 0
                            : mode === 'rectangle'
                            ? borderRadius
                            : borderRadius,
                        ),
                        backgroundColor: mode === 'flat' ? '#FFFFFF' : bgColor,
                        paddingBottom: 0,
                        paddingTop: 0,
                      }}
                    />
                  </Animated.View>
                );
              })}
            </View>
            {iserror ? <Text style={errorMsgStyle}>{errorMsg}</Text> : null}
            {isResendOtpDisplay ? (
              <View
                style={{
                  ...styles.containerWrap,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={ResendHandler}
                  disabled={
                    onlyResendOtp || (minute === 0 && second === 0)
                      ? false
                      : true
                  }
                  style={{
                    opacity:
                      onlyResendOtp || (minute === 0 && second === 0) ? 1 : 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: scale(20),
                  }}>
                  <Text style={resendTextStyle}>
                    Resend OPT
                    {minute === 0 &&
                    second === 0 ? null : onlyResendOtp ? null : (
                      <Text style={resendTextStyle}>
                        {' '}
                        in{' '}
                        {minute !== 0
                          ? `${minute}:${second} sec`
                          : ` ${second} sec`}
                      </Text>
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {isButtonDisplay ? (
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: scale(10),
                  marginHorizontal: scale(30),
                }}>
                <TouchableOpacity
                  onPress={() => onSubmit(parseInt(otp.join('')))}
                  disabled={activeOtpIndex === pinCount ? false : true}
                  style={{
                    ...buttonStyle,
                    opacity: activeOtpIndex === pinCount ? 1 : 0.5,
                  }}>
                  <Text style={buttonTitleStyle}>{buttonTitle}</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default RnOtpInputs;

const styles = StyleSheet.create({
  container: {
    marginVertical: scale(10),
  },
  containerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(10),
    marginHorizontal: scale(30),
    flexWrap: 'wrap',
  },
  buttonStyle: {
    flex: 1,
    backgroundColor: '#349beb',
    height: scale(40),
    fontSize: scale(8),
    borderColor: '',
    borderRadius: scale(6),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: scale(10),
    marginBottom: scale(0),
    marginLeft: scale(0),
    marginHorizontal: scale(0),
    marginVertical: scale(0),
  },
  buttonTitleStyle: {
    fontSize: scale(15),
    color: '#FFFFFF',
  },
  resendTextStyle: {
    fontSize: scale(15),
    color: '#404B69',
  },
  errorMsgStyle: {
    marginLeft: scale(30),
    marginTop: scale(5),
    fontSize: scale(12),
    color: 'red',
  },
});
