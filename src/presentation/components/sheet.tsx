import * as React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

type SheetContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SheetContext = React.createContext<SheetContextType>({
  open: false,
  setOpen: () => {},
});

export function Sheet({
  children,
  open: controlledOpen,
  onOpenChange,
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({ children }: { children: React.ReactNode }) {
  const { setOpen } = React.useContext(SheetContext);
  
  return (
    <TouchableOpacity onPress={() => setOpen(true)}>
      {children}
    </TouchableOpacity>
  );
}

export function SheetClose({ children }: { children: React.ReactNode }) {
  const { setOpen } = React.useContext(SheetContext);
  
  return (
    <TouchableOpacity onPress={() => setOpen(false)}>
      {children}
    </TouchableOpacity>
  );
}

export function SheetContent({
  children,
  side = 'right',
  style,
}: {
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  style?: any;
}) {
  const { open, setOpen } = React.useContext(SheetContext);
  const slideAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: open ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [open]);

  const getTransform = () => {
    switch (side) {
      case 'right':
        return { translateX: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [width, 0] }) };
      case 'left':
        return { translateX: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [-width, 0] }) };
      case 'top':
        return { translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [-height, 0] }) };
      case 'bottom':
        return { translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [height, 0] }) };
    }
  };

  const getContentStyle = () => {
    const baseStyle = [styles.content, style];
    switch (side) {
      case 'right':
        return [...baseStyle, styles.contentRight];
      case 'left':
        return [...baseStyle, styles.contentLeft];
      case 'top':
        return [...baseStyle, styles.contentTop];
      case 'bottom':
        return [...baseStyle, styles.contentBottom];
    }
  };

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={() => setOpen(false)}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        />
        <Animated.View style={[getContentStyle(), { transform: [getTransform()] }]}>
          {children}
          <TouchableOpacity style={styles.closeButton} onPress={() => setOpen(false)}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

export function SheetHeader({ children, style }: { children: React.ReactNode; style?: any }) {
  return <View style={[styles.header, style]}>{children}</View>;
}

export function SheetFooter({ children, style }: { children: React.ReactNode; style?: any }) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

export function SheetTitle({ children, style }: { children: React.ReactNode; style?: any }) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

export function SheetDescription({ children, style }: { children: React.ReactNode; style?: any }) {
  return <Text style={[styles.description, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contentRight: {
    right: 0,
    top: 0,
    bottom: 0,
    width: width * 0.75,
    maxWidth: 384,
  },
  contentLeft: {
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.75,
    maxWidth: 384,
  },
  contentTop: {
    top: 0,
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  contentBottom: {
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    color: '#6b7280',
  },
  header: {
    marginBottom: 16,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
});
