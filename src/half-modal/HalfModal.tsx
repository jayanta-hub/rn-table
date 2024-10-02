import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface HalfModalProps {
  children: React.ReactNode;
  dragIconName?: 'bar' | 'dots';
  dragIconStyle?: object;
  dragIconColor?: string;
  hasDraggable?: boolean;
  hasDraggableIcon?: boolean;
  numberOfDots?: number;
  modalVisible: boolean;
  setModalVisible?: (e: boolean) => void;
  minHeight?: number;
  modalInitialHeight?: number;
  modalWidth?: any;
  modalBackgroundColor?: string;
}

const HalfModal: React.FC<HalfModalProps> = ({
  children,
  dragIconName = 'bar',
  dragIconStyle,
  dragIconColor = '#A3A3A3',
  hasDraggable = true,
  hasDraggableIcon = true,
  numberOfDots = 3,
  modalVisible = false,
  minHeight = 60,
  modalInitialHeight = SCREEN_HEIGHT / 2,
  modalWidth = '100%',
  modalBackgroundColor = 'white',
  setModalVisible = () => {},
}) => {
  const [numberOfDotsArray] = useState(new Array(numberOfDots).fill(1));
  modalInitialHeight =
    modalInitialHeight >= Math.floor(SCREEN_HEIGHT) - 50
      ? Math.floor(SCREEN_HEIGHT) - 100
      : modalInitialHeight;
  const modalHeightValue = useRef(
    new Animated.Value(modalInitialHeight),
  ).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newHeight = SCREEN_HEIGHT - gestureState.moveY;
        if (newHeight >= minHeight && newHeight <= SCREEN_HEIGHT - 100) {
          modalHeightValue.setValue(newHeight);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const newHeight = SCREEN_HEIGHT - gestureState.moveY;
        if (newHeight <= 160) {
          setModalVisible(false);
          modalHeightValue.setValue(modalInitialHeight);
        }
      },
    }),
  ).current;
  /**
   * ? For reset the value of the modalInitialHeight
   */
  !modalVisible &&
    modalHeightValue.setValue(
      modalInitialHeight >= Math.floor(SCREEN_HEIGHT)
        ? Math.floor(SCREEN_HEIGHT) / 2
        : modalInitialHeight,
    );

  /**
   *  Returns an array of View components representing dots.
   *
   *  @return {React.ReactNode} An array of View components.
   */
  const renderDots = (): React.ReactNode => {
    return numberOfDotsArray.map((_, index) => (
      <View
        key={index}
        style={[
          styles.draggableDotsIcon,
          dragIconStyle,
          {backgroundColor: dragIconColor, marginHorizontal: 2},
        ]}
      />
    ));
  };
  const renderBars = (): React.ReactNode => {
    return (
      <>
        <View
          style={
            dragIconStyle
              ? dragIconStyle
              : [
                  styles.draggableIcon,
                  {
                    backgroundColor: dragIconColor,
                  },
                ]
          }
        />
      </>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={{...styles.background}}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        />
        {hasDraggable ? ( // when hasDraggable is true
          <Animated.View
            style={[
              styles.modal,
              {
                width: modalWidth,
                backgroundColor: modalBackgroundColor,
              },
            ]}
            {...panResponder.panHandlers}>
            {hasDraggableIcon && ( // when hasDraggable is true and hasDraggableIcon is true
              <View style={styles.draggableContainer}>
                {dragIconName === 'bar'
                  ? renderBars()
                  : dragIconName === 'dots' && renderDots()}
              </View>
            )}
          </Animated.View>
        ) : hasDraggableIcon ? ( // when hasDraggable is false and hasDraggableIcon is true
          <View
            style={[
              styles.modal,
              {
                width: modalWidth,
                backgroundColor: modalBackgroundColor,
              },
            ]}>
            <View style={styles.draggableContainer}>
              <View
                style={dragIconStyle ? dragIconStyle : styles.draggableIcon}
              />
            </View>
          </View>
        ) : (
          // when hasDraggable is false and hasDraggableIcon is false
          <View
            style={[
              styles.modal,
              {
                width: modalWidth,
                backgroundColor: modalBackgroundColor,
              },
            ]}
          />
        )}
        <Animated.View
          style={{
            height: modalHeightValue,
            width: modalWidth,
            backgroundColor: modalBackgroundColor,
            padding: 10,
          }}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    opacity: 0.3,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14,
    elevation: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  draggableContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%',
  },
  draggableIcon: {
    width: 40,
    height: 6,
    borderRadius: 3,
  },
  draggableDotsIcon: {
    width: 6.5,
    height: 6.5,
    borderRadius: 3,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default HalfModal;
