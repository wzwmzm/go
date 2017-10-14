package main

//#include <stdint.h>
//#include <stdlib.h>
//#include <string.h>
//#include "moc.h"
import "C"
import (
	"runtime"
	"strings"
	"unsafe"

	"github.com/therecipe/qt"
	std_core "github.com/therecipe/qt/core"
	std_gui "github.com/therecipe/qt/gui"
	std_widgets "github.com/therecipe/qt/widgets"
)

func cGoUnpackString(s C.struct_Moc_PackedString) string {
	if len := int(s.len); len == -1 {
		return C.GoString(s.data)
	}
	return C.GoStringN(s.data, C.int(s.len))
}

type Widget_ITF interface {
	std_widgets.QWidget_ITF
	Widget_PTR() *Widget
}

func (ptr *Widget) Widget_PTR() *Widget {
	return ptr
}

func (ptr *Widget) Pointer() unsafe.Pointer {
	if ptr != nil {
		return ptr.QWidget_PTR().Pointer()
	}
	return nil
}

func (ptr *Widget) SetPointer(p unsafe.Pointer) {
	if ptr != nil {
		ptr.QWidget_PTR().SetPointer(p)
	}
}

func PointerFromWidget(ptr Widget_ITF) unsafe.Pointer {
	if ptr != nil {
		return ptr.Widget_PTR().Pointer()
	}
	return nil
}

func NewWidgetFromPointer(ptr unsafe.Pointer) *Widget {
	var n *Widget
	if gPtr, ok := qt.Receive(ptr); !ok {
		n = new(Widget)
		n.SetPointer(ptr)
	} else {
		switch deduced := gPtr.(type) {
		case *Widget:
			n = deduced

		case *std_widgets.QWidget:
			n = &Widget{QWidget: *deduced}

		default:
			n = new(Widget)
			n.SetPointer(ptr)
		}
	}
	return n
}

//export callbackWidget_Constructor
func callbackWidget_Constructor(ptr unsafe.Pointer) {
	gPtr := NewWidgetFromPointer(ptr)
	qt.Register(ptr, gPtr)
	gPtr.init()
}

func Widget_QRegisterMetaType() int {
	return int(int32(C.Widget_Widget_QRegisterMetaType()))
}

func (ptr *Widget) QRegisterMetaType() int {
	return int(int32(C.Widget_Widget_QRegisterMetaType()))
}

func Widget_QRegisterMetaType2(typeName string) int {
	var typeNameC *C.char
	if typeName != "" {
		typeNameC = C.CString(typeName)
		defer C.free(unsafe.Pointer(typeNameC))
	}
	return int(int32(C.Widget_Widget_QRegisterMetaType2(typeNameC)))
}

func (ptr *Widget) QRegisterMetaType2(typeName string) int {
	var typeNameC *C.char
	if typeName != "" {
		typeNameC = C.CString(typeName)
		defer C.free(unsafe.Pointer(typeNameC))
	}
	return int(int32(C.Widget_Widget_QRegisterMetaType2(typeNameC)))
}

func Widget_QmlRegisterType() int {
	return int(int32(C.Widget_Widget_QmlRegisterType()))
}

func (ptr *Widget) QmlRegisterType() int {
	return int(int32(C.Widget_Widget_QmlRegisterType()))
}

func Widget_QmlRegisterType2(uri string, versionMajor int, versionMinor int, qmlName string) int {
	var uriC *C.char
	if uri != "" {
		uriC = C.CString(uri)
		defer C.free(unsafe.Pointer(uriC))
	}
	var qmlNameC *C.char
	if qmlName != "" {
		qmlNameC = C.CString(qmlName)
		defer C.free(unsafe.Pointer(qmlNameC))
	}
	return int(int32(C.Widget_Widget_QmlRegisterType2(uriC, C.int(int32(versionMajor)), C.int(int32(versionMinor)), qmlNameC)))
}

func (ptr *Widget) QmlRegisterType2(uri string, versionMajor int, versionMinor int, qmlName string) int {
	var uriC *C.char
	if uri != "" {
		uriC = C.CString(uri)
		defer C.free(unsafe.Pointer(uriC))
	}
	var qmlNameC *C.char
	if qmlName != "" {
		qmlNameC = C.CString(qmlName)
		defer C.free(unsafe.Pointer(qmlNameC))
	}
	return int(int32(C.Widget_Widget_QmlRegisterType2(uriC, C.int(int32(versionMajor)), C.int(int32(versionMinor)), qmlNameC)))
}

func (ptr *Widget) __addActions_actions_atList(i int) *std_widgets.QAction {
	if ptr.Pointer() != nil {
		var tmpValue = std_widgets.NewQActionFromPointer(C.Widget___addActions_actions_atList(ptr.Pointer(), C.int(int32(i))))
		if !qt.ExistsSignal(tmpValue.Pointer(), "destroyed") {
			tmpValue.ConnectDestroyed(func(*std_core.QObject) { tmpValue.SetPointer(nil) })
		}
		return tmpValue
	}
	return nil
}

func (ptr *Widget) __addActions_actions_setList(i std_widgets.QAction_ITF) {
	if ptr.Pointer() != nil {
		C.Widget___addActions_actions_setList(ptr.Pointer(), std_widgets.PointerFromQAction(i))
	}
}

func (ptr *Widget) __addActions_actions_newList() unsafe.Pointer {
	return unsafe.Pointer(C.Widget___addActions_actions_newList(ptr.Pointer()))
}

func (ptr *Widget) __insertActions_actions_atList(i int) *std_widgets.QAction {
	if ptr.Pointer() != nil {
		var tmpValue = std_widgets.NewQActionFromPointer(C.Widget___insertActions_actions_atList(ptr.Pointer(), C.int(int32(i))))
		if !qt.ExistsSignal(tmpValue.Pointer(), "destroyed") {
			tmpValue.ConnectDestroyed(func(*std_core.QObject) { tmpValue.SetPointer(nil) })
		}
		return tmpValue
	}
	return nil
}

func (ptr *Widget) __insertActions_actions_setList(i std_widgets.QAction_ITF) {
	if ptr.Pointer() != nil {
		C.Widget___insertActions_actions_setList(ptr.Pointer(), std_widgets.PointerFromQAction(i))
	}
}

func (ptr *Widget) __insertActions_actions_newList() unsafe.Pointer {
	return unsafe.Pointer(C.Widget___insertActions_actions_newList(ptr.Pointer()))
}

func (ptr *Widget) __actions_atList(i int) *std_widgets.QAction {
	if ptr.Pointer() != nil {
		var tmpValue = std_widgets.NewQActionFromPointer(C.Widget___actions_atList(ptr.Pointer(), C.int(int32(i))))
		if !qt.ExistsSignal(tmpValue.Pointer(), "destroyed") {
			tmpValue.ConnectDestroyed(func(*std_core.QObject) { tmpValue.SetPointer(nil) })
		}
		return tmpValue
	}
	return nil
}

func (ptr *Widget) __actions_setList(i std_widgets.QAction_ITF) {
	if ptr.Pointer() != nil {
		C.Widget___actions_setList(ptr.Pointer(), std_widgets.PointerFromQAction(i))
	}
}

func (ptr *Widget) __actions_newList() unsafe.Pointer {
	return unsafe.Pointer(C.Widget___actions_newList(ptr.Pointer()))
}

func (ptr *Widget) __dynamicPropertyNames_atList(i int) *std_core.QByteArray {
	if ptr.Pointer() != nil {
		var tmpValue = std_core.NewQByteArrayFromPointer(C.Widget___dynamicPropertyNames_atList(ptr.Pointer(), C.int(int32(i))))
		runtime.SetFinalizer(tmpValue, (*std_core.QByteArray).DestroyQByteArray)
		return tmpValue
	}
	return nil
}

func (ptr *Widget) __dynamicPropertyNames_setList(i std_core.QByteArray_ITF) {
	if ptr.Pointer() != nil {
		C.Widget___dynamicPropertyNames_setList(ptr.Pointer(), std_core.PointerFromQByteArray(i))
	}
}

func (ptr *Widget) __dynamicPropertyNames_newList() unsafe.Pointer {
	return unsafe.Pointer(C.Widget___dynamicPropertyNames_newList(ptr.Pointer()))
}

func (ptr *Widget) __findChildren_atList2(i int) *std_core.QObject {
	if ptr.Pointer() != nil {
		var tmpValue = std_core.NewQObjectFromPointer(C.Widget___findChildren_atList2(ptr.Pointer(), C.int(int32(i))))
		if !qt.ExistsSignal(tmpValue.Pointer(), "destroyed") {
			tmpValue.ConnectDestroyed(func(*std_core.QObject) { tmpValue.SetPointer(nil) })
		}
		return tmpValue
	}
	return nil
}

func (ptr *Widget) __findChildren_setList2(i std_core.QObject_ITF) {
	if ptr.Pointer() != nil {
		C.Widget___findChildren_setList2(ptr.Pointer(), std_core.PointerFromQObject(i))
	}
}

func (ptr *Widget) __findChildren_newList2() unsafe.Pointer {
	return unsafe.Pointer(C.Widget___findChildren_newList2(ptr.Pointer()))
}

func (ptr *Widget) __findChildren_atList3(i int) *std_core.QObject {
	if ptr.Pointer() != nil {
		var tmpValue = std_core.NewQObjectFromPointer(C.Widget___findChildren_atList3(ptr.Pointer(), C.int(int32(i))))
		if !qt.ExistsSignal(tmpValue.Pointer(), "destroyed") {
			tmpValue.ConnectDestroyed(func(*std_core.QObject) { tmpValue.SetPointer(nil) })
		}
		return tmpValue
	}
	return nil
}

func (ptr *Widget) __findChildren_setList3(i std_core.QObject_ITF) {
	if ptr.Pointer() != nil {
		C.Widget___findChildren_setList3(ptr.Pointer(), std_core.PointerFromQObject(i))
	}
}

func (ptr *Widget) __findChildren_newList3() unsafe.Pointer {
	return unsafe.Pointer(C.Widget___findChildren_newList3(ptr.Pointer()))
}

func (ptr *Widget) __findChildren_atList(i int) *std_core.QObject {
	if ptr.Pointer() != nil {
		var tmpValue = std_core.NewQObjectFromPointer(C.Widget___findChildren_atList(ptr.Pointer(), C.int(int32(i))))
		if !qt.ExistsSignal(tmpValue.Pointer(), "destroyed") {
			tmpValue.ConnectDestroyed(func(*std_core.QObject) { tmpValue.SetPointer(nil) })
		}
		return tmpValue
	}
	return nil
}

func (ptr *Widget) __findChildren_setList(i std_core.QObject_ITF) {
	if ptr.Pointer() != nil {
		C.Widget___findChildren_setList(ptr.Pointer(), std_core.PointerFromQObject(i))
	}
}

func (ptr *Widget) __findChildren_newList() unsafe.Pointer {
	return unsafe.Pointer(C.Widget___findChildren_newList(ptr.Pointer()))
}

func (ptr *Widget) __children_atList(i int) *std_core.QObject {
	if ptr.Pointer() != nil {
		var tmpValue = std_core.NewQObjectFromPointer(C.Widget___children_atList(ptr.Pointer(), C.int(int32(i))))
		if !qt.ExistsSignal(tmpValue.Pointer(), "destroyed") {
			tmpValue.ConnectDestroyed(func(*std_core.QObject) { tmpValue.SetPointer(nil) })
		}
		return tmpValue
	}
	return nil
}

func (ptr *Widget) __children_setList(i std_core.QObject_ITF) {
	if ptr.Pointer() != nil {
		C.Widget___children_setList(ptr.Pointer(), std_core.PointerFromQObject(i))
	}
}

func (ptr *Widget) __children_newList() unsafe.Pointer {
	return unsafe.Pointer(C.Widget___children_newList(ptr.Pointer()))
}

func NewWidget(parent std_widgets.QWidget_ITF, fo std_core.Qt__WindowType) *Widget {
	var tmpValue = NewWidgetFromPointer(C.Widget_NewWidget(std_widgets.PointerFromQWidget(parent), C.longlong(fo)))
	if !qt.ExistsSignal(tmpValue.Pointer(), "destroyed") {
		tmpValue.ConnectDestroyed(func(*std_core.QObject) { tmpValue.SetPointer(nil) })
	}
	return tmpValue
}

func (ptr *Widget) DestroyWidget() {
	if ptr.Pointer() != nil {
		C.Widget_DestroyWidget(ptr.Pointer())
		ptr.SetPointer(nil)
		runtime.SetFinalizer(ptr, nil)
	}
}

//export callbackWidget_Close
func callbackWidget_Close(ptr unsafe.Pointer) C.char {
	if signal := qt.GetSignal(ptr, "close"); signal != nil {
		return C.char(int8(qt.GoBoolToInt(signal.(func() bool)())))
	}

	return C.char(int8(qt.GoBoolToInt(NewWidgetFromPointer(ptr).CloseDefault())))
}

func (ptr *Widget) CloseDefault() bool {
	if ptr.Pointer() != nil {
		return C.Widget_CloseDefault(ptr.Pointer()) != 0
	}
	return false
}

//export callbackWidget_Event
func callbackWidget_Event(ptr unsafe.Pointer, event unsafe.Pointer) C.char {
	if signal := qt.GetSignal(ptr, "event"); signal != nil {
		return C.char(int8(qt.GoBoolToInt(signal.(func(*std_core.QEvent) bool)(std_core.NewQEventFromPointer(event)))))
	}

	return C.char(int8(qt.GoBoolToInt(NewWidgetFromPointer(ptr).EventDefault(std_core.NewQEventFromPointer(event)))))
}

func (ptr *Widget) EventDefault(event std_core.QEvent_ITF) bool {
	if ptr.Pointer() != nil {
		return C.Widget_EventDefault(ptr.Pointer(), std_core.PointerFromQEvent(event)) != 0
	}
	return false
}

//export callbackWidget_FocusNextPrevChild
func callbackWidget_FocusNextPrevChild(ptr unsafe.Pointer, next C.char) C.char {
	if signal := qt.GetSignal(ptr, "focusNextPrevChild"); signal != nil {
		return C.char(int8(qt.GoBoolToInt(signal.(func(bool) bool)(int8(next) != 0))))
	}

	return C.char(int8(qt.GoBoolToInt(NewWidgetFromPointer(ptr).FocusNextPrevChildDefault(int8(next) != 0))))
}

func (ptr *Widget) FocusNextPrevChildDefault(next bool) bool {
	if ptr.Pointer() != nil {
		return C.Widget_FocusNextPrevChildDefault(ptr.Pointer(), C.char(int8(qt.GoBoolToInt(next)))) != 0
	}
	return false
}

//export callbackWidget_NativeEvent
func callbackWidget_NativeEvent(ptr unsafe.Pointer, eventType unsafe.Pointer, message unsafe.Pointer, result C.long) C.char {
	if signal := qt.GetSignal(ptr, "nativeEvent"); signal != nil {
		return C.char(int8(qt.GoBoolToInt(signal.(func(*std_core.QByteArray, unsafe.Pointer, int) bool)(std_core.NewQByteArrayFromPointer(eventType), message, int(int32(result))))))
	}

	return C.char(int8(qt.GoBoolToInt(NewWidgetFromPointer(ptr).NativeEventDefault(std_core.NewQByteArrayFromPointer(eventType), message, int(int32(result))))))
}

func (ptr *Widget) NativeEventDefault(eventType std_core.QByteArray_ITF, message unsafe.Pointer, result int) bool {
	if ptr.Pointer() != nil {
		return C.Widget_NativeEventDefault(ptr.Pointer(), std_core.PointerFromQByteArray(eventType), message, C.long(int32(result))) != 0
	}
	return false
}

//export callbackWidget_ActionEvent
func callbackWidget_ActionEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "actionEvent"); signal != nil {
		signal.(func(*std_gui.QActionEvent))(std_gui.NewQActionEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).ActionEventDefault(std_gui.NewQActionEventFromPointer(event))
	}
}

func (ptr *Widget) ActionEventDefault(event std_gui.QActionEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_ActionEventDefault(ptr.Pointer(), std_gui.PointerFromQActionEvent(event))
	}
}

//export callbackWidget_ChangeEvent
func callbackWidget_ChangeEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "changeEvent"); signal != nil {
		signal.(func(*std_core.QEvent))(std_core.NewQEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).ChangeEventDefault(std_core.NewQEventFromPointer(event))
	}
}

func (ptr *Widget) ChangeEventDefault(event std_core.QEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_ChangeEventDefault(ptr.Pointer(), std_core.PointerFromQEvent(event))
	}
}

//export callbackWidget_CloseEvent
func callbackWidget_CloseEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "closeEvent"); signal != nil {
		signal.(func(*std_gui.QCloseEvent))(std_gui.NewQCloseEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).CloseEventDefault(std_gui.NewQCloseEventFromPointer(event))
	}
}

func (ptr *Widget) CloseEventDefault(event std_gui.QCloseEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_CloseEventDefault(ptr.Pointer(), std_gui.PointerFromQCloseEvent(event))
	}
}

//export callbackWidget_ContextMenuEvent
func callbackWidget_ContextMenuEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "contextMenuEvent"); signal != nil {
		signal.(func(*std_gui.QContextMenuEvent))(std_gui.NewQContextMenuEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).ContextMenuEventDefault(std_gui.NewQContextMenuEventFromPointer(event))
	}
}

func (ptr *Widget) ContextMenuEventDefault(event std_gui.QContextMenuEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_ContextMenuEventDefault(ptr.Pointer(), std_gui.PointerFromQContextMenuEvent(event))
	}
}

//export callbackWidget_CustomContextMenuRequested
func callbackWidget_CustomContextMenuRequested(ptr unsafe.Pointer, pos unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "customContextMenuRequested"); signal != nil {
		signal.(func(*std_core.QPoint))(std_core.NewQPointFromPointer(pos))
	}

}

//export callbackWidget_DragEnterEvent
func callbackWidget_DragEnterEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "dragEnterEvent"); signal != nil {
		signal.(func(*std_gui.QDragEnterEvent))(std_gui.NewQDragEnterEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).DragEnterEventDefault(std_gui.NewQDragEnterEventFromPointer(event))
	}
}

func (ptr *Widget) DragEnterEventDefault(event std_gui.QDragEnterEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_DragEnterEventDefault(ptr.Pointer(), std_gui.PointerFromQDragEnterEvent(event))
	}
}

//export callbackWidget_DragLeaveEvent
func callbackWidget_DragLeaveEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "dragLeaveEvent"); signal != nil {
		signal.(func(*std_gui.QDragLeaveEvent))(std_gui.NewQDragLeaveEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).DragLeaveEventDefault(std_gui.NewQDragLeaveEventFromPointer(event))
	}
}

func (ptr *Widget) DragLeaveEventDefault(event std_gui.QDragLeaveEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_DragLeaveEventDefault(ptr.Pointer(), std_gui.PointerFromQDragLeaveEvent(event))
	}
}

//export callbackWidget_DragMoveEvent
func callbackWidget_DragMoveEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "dragMoveEvent"); signal != nil {
		signal.(func(*std_gui.QDragMoveEvent))(std_gui.NewQDragMoveEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).DragMoveEventDefault(std_gui.NewQDragMoveEventFromPointer(event))
	}
}

func (ptr *Widget) DragMoveEventDefault(event std_gui.QDragMoveEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_DragMoveEventDefault(ptr.Pointer(), std_gui.PointerFromQDragMoveEvent(event))
	}
}

//export callbackWidget_DropEvent
func callbackWidget_DropEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "dropEvent"); signal != nil {
		signal.(func(*std_gui.QDropEvent))(std_gui.NewQDropEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).DropEventDefault(std_gui.NewQDropEventFromPointer(event))
	}
}

func (ptr *Widget) DropEventDefault(event std_gui.QDropEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_DropEventDefault(ptr.Pointer(), std_gui.PointerFromQDropEvent(event))
	}
}

//export callbackWidget_EnterEvent
func callbackWidget_EnterEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "enterEvent"); signal != nil {
		signal.(func(*std_core.QEvent))(std_core.NewQEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).EnterEventDefault(std_core.NewQEventFromPointer(event))
	}
}

func (ptr *Widget) EnterEventDefault(event std_core.QEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_EnterEventDefault(ptr.Pointer(), std_core.PointerFromQEvent(event))
	}
}

//export callbackWidget_FocusInEvent
func callbackWidget_FocusInEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "focusInEvent"); signal != nil {
		signal.(func(*std_gui.QFocusEvent))(std_gui.NewQFocusEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).FocusInEventDefault(std_gui.NewQFocusEventFromPointer(event))
	}
}

func (ptr *Widget) FocusInEventDefault(event std_gui.QFocusEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_FocusInEventDefault(ptr.Pointer(), std_gui.PointerFromQFocusEvent(event))
	}
}

//export callbackWidget_FocusOutEvent
func callbackWidget_FocusOutEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "focusOutEvent"); signal != nil {
		signal.(func(*std_gui.QFocusEvent))(std_gui.NewQFocusEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).FocusOutEventDefault(std_gui.NewQFocusEventFromPointer(event))
	}
}

func (ptr *Widget) FocusOutEventDefault(event std_gui.QFocusEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_FocusOutEventDefault(ptr.Pointer(), std_gui.PointerFromQFocusEvent(event))
	}
}

//export callbackWidget_Hide
func callbackWidget_Hide(ptr unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "hide"); signal != nil {
		signal.(func())()
	} else {
		NewWidgetFromPointer(ptr).HideDefault()
	}
}

func (ptr *Widget) HideDefault() {
	if ptr.Pointer() != nil {
		C.Widget_HideDefault(ptr.Pointer())
	}
}

//export callbackWidget_HideEvent
func callbackWidget_HideEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "hideEvent"); signal != nil {
		signal.(func(*std_gui.QHideEvent))(std_gui.NewQHideEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).HideEventDefault(std_gui.NewQHideEventFromPointer(event))
	}
}

func (ptr *Widget) HideEventDefault(event std_gui.QHideEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_HideEventDefault(ptr.Pointer(), std_gui.PointerFromQHideEvent(event))
	}
}

//export callbackWidget_InputMethodEvent
func callbackWidget_InputMethodEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "inputMethodEvent"); signal != nil {
		signal.(func(*std_gui.QInputMethodEvent))(std_gui.NewQInputMethodEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).InputMethodEventDefault(std_gui.NewQInputMethodEventFromPointer(event))
	}
}

func (ptr *Widget) InputMethodEventDefault(event std_gui.QInputMethodEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_InputMethodEventDefault(ptr.Pointer(), std_gui.PointerFromQInputMethodEvent(event))
	}
}

//export callbackWidget_KeyPressEvent
func callbackWidget_KeyPressEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "keyPressEvent"); signal != nil {
		signal.(func(*std_gui.QKeyEvent))(std_gui.NewQKeyEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).KeyPressEventDefault(std_gui.NewQKeyEventFromPointer(event))
	}
}

func (ptr *Widget) KeyPressEventDefault(event std_gui.QKeyEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_KeyPressEventDefault(ptr.Pointer(), std_gui.PointerFromQKeyEvent(event))
	}
}

//export callbackWidget_KeyReleaseEvent
func callbackWidget_KeyReleaseEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "keyReleaseEvent"); signal != nil {
		signal.(func(*std_gui.QKeyEvent))(std_gui.NewQKeyEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).KeyReleaseEventDefault(std_gui.NewQKeyEventFromPointer(event))
	}
}

func (ptr *Widget) KeyReleaseEventDefault(event std_gui.QKeyEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_KeyReleaseEventDefault(ptr.Pointer(), std_gui.PointerFromQKeyEvent(event))
	}
}

//export callbackWidget_LeaveEvent
func callbackWidget_LeaveEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "leaveEvent"); signal != nil {
		signal.(func(*std_core.QEvent))(std_core.NewQEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).LeaveEventDefault(std_core.NewQEventFromPointer(event))
	}
}

func (ptr *Widget) LeaveEventDefault(event std_core.QEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_LeaveEventDefault(ptr.Pointer(), std_core.PointerFromQEvent(event))
	}
}

//export callbackWidget_Lower
func callbackWidget_Lower(ptr unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "lower"); signal != nil {
		signal.(func())()
	} else {
		NewWidgetFromPointer(ptr).LowerDefault()
	}
}

func (ptr *Widget) LowerDefault() {
	if ptr.Pointer() != nil {
		C.Widget_LowerDefault(ptr.Pointer())
	}
}

//export callbackWidget_MouseDoubleClickEvent
func callbackWidget_MouseDoubleClickEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "mouseDoubleClickEvent"); signal != nil {
		signal.(func(*std_gui.QMouseEvent))(std_gui.NewQMouseEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).MouseDoubleClickEventDefault(std_gui.NewQMouseEventFromPointer(event))
	}
}

func (ptr *Widget) MouseDoubleClickEventDefault(event std_gui.QMouseEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_MouseDoubleClickEventDefault(ptr.Pointer(), std_gui.PointerFromQMouseEvent(event))
	}
}

//export callbackWidget_MouseMoveEvent
func callbackWidget_MouseMoveEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "mouseMoveEvent"); signal != nil {
		signal.(func(*std_gui.QMouseEvent))(std_gui.NewQMouseEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).MouseMoveEventDefault(std_gui.NewQMouseEventFromPointer(event))
	}
}

func (ptr *Widget) MouseMoveEventDefault(event std_gui.QMouseEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_MouseMoveEventDefault(ptr.Pointer(), std_gui.PointerFromQMouseEvent(event))
	}
}

//export callbackWidget_MousePressEvent
func callbackWidget_MousePressEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "mousePressEvent"); signal != nil {
		signal.(func(*std_gui.QMouseEvent))(std_gui.NewQMouseEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).MousePressEventDefault(std_gui.NewQMouseEventFromPointer(event))
	}
}

func (ptr *Widget) MousePressEventDefault(event std_gui.QMouseEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_MousePressEventDefault(ptr.Pointer(), std_gui.PointerFromQMouseEvent(event))
	}
}

//export callbackWidget_MouseReleaseEvent
func callbackWidget_MouseReleaseEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "mouseReleaseEvent"); signal != nil {
		signal.(func(*std_gui.QMouseEvent))(std_gui.NewQMouseEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).MouseReleaseEventDefault(std_gui.NewQMouseEventFromPointer(event))
	}
}

func (ptr *Widget) MouseReleaseEventDefault(event std_gui.QMouseEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_MouseReleaseEventDefault(ptr.Pointer(), std_gui.PointerFromQMouseEvent(event))
	}
}

//export callbackWidget_MoveEvent
func callbackWidget_MoveEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "moveEvent"); signal != nil {
		signal.(func(*std_gui.QMoveEvent))(std_gui.NewQMoveEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).MoveEventDefault(std_gui.NewQMoveEventFromPointer(event))
	}
}

func (ptr *Widget) MoveEventDefault(event std_gui.QMoveEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_MoveEventDefault(ptr.Pointer(), std_gui.PointerFromQMoveEvent(event))
	}
}

//export callbackWidget_PaintEvent
func callbackWidget_PaintEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "paintEvent"); signal != nil {
		signal.(func(*std_gui.QPaintEvent))(std_gui.NewQPaintEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).PaintEventDefault(std_gui.NewQPaintEventFromPointer(event))
	}
}

func (ptr *Widget) PaintEventDefault(event std_gui.QPaintEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_PaintEventDefault(ptr.Pointer(), std_gui.PointerFromQPaintEvent(event))
	}
}

//export callbackWidget_Raise
func callbackWidget_Raise(ptr unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "raise"); signal != nil {
		signal.(func())()
	} else {
		NewWidgetFromPointer(ptr).RaiseDefault()
	}
}

func (ptr *Widget) RaiseDefault() {
	if ptr.Pointer() != nil {
		C.Widget_RaiseDefault(ptr.Pointer())
	}
}

//export callbackWidget_Repaint
func callbackWidget_Repaint(ptr unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "repaint"); signal != nil {
		signal.(func())()
	} else {
		NewWidgetFromPointer(ptr).RepaintDefault()
	}
}

func (ptr *Widget) RepaintDefault() {
	if ptr.Pointer() != nil {
		C.Widget_RepaintDefault(ptr.Pointer())
	}
}

//export callbackWidget_ResizeEvent
func callbackWidget_ResizeEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "resizeEvent"); signal != nil {
		signal.(func(*std_gui.QResizeEvent))(std_gui.NewQResizeEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).ResizeEventDefault(std_gui.NewQResizeEventFromPointer(event))
	}
}

func (ptr *Widget) ResizeEventDefault(event std_gui.QResizeEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_ResizeEventDefault(ptr.Pointer(), std_gui.PointerFromQResizeEvent(event))
	}
}

//export callbackWidget_SetDisabled
func callbackWidget_SetDisabled(ptr unsafe.Pointer, disable C.char) {
	if signal := qt.GetSignal(ptr, "setDisabled"); signal != nil {
		signal.(func(bool))(int8(disable) != 0)
	} else {
		NewWidgetFromPointer(ptr).SetDisabledDefault(int8(disable) != 0)
	}
}

func (ptr *Widget) SetDisabledDefault(disable bool) {
	if ptr.Pointer() != nil {
		C.Widget_SetDisabledDefault(ptr.Pointer(), C.char(int8(qt.GoBoolToInt(disable))))
	}
}

//export callbackWidget_SetEnabled
func callbackWidget_SetEnabled(ptr unsafe.Pointer, vbo C.char) {
	if signal := qt.GetSignal(ptr, "setEnabled"); signal != nil {
		signal.(func(bool))(int8(vbo) != 0)
	} else {
		NewWidgetFromPointer(ptr).SetEnabledDefault(int8(vbo) != 0)
	}
}

func (ptr *Widget) SetEnabledDefault(vbo bool) {
	if ptr.Pointer() != nil {
		C.Widget_SetEnabledDefault(ptr.Pointer(), C.char(int8(qt.GoBoolToInt(vbo))))
	}
}

//export callbackWidget_SetFocus2
func callbackWidget_SetFocus2(ptr unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "setFocus2"); signal != nil {
		signal.(func())()
	} else {
		NewWidgetFromPointer(ptr).SetFocus2Default()
	}
}

func (ptr *Widget) SetFocus2Default() {
	if ptr.Pointer() != nil {
		C.Widget_SetFocus2Default(ptr.Pointer())
	}
}

//export callbackWidget_SetHidden
func callbackWidget_SetHidden(ptr unsafe.Pointer, hidden C.char) {
	if signal := qt.GetSignal(ptr, "setHidden"); signal != nil {
		signal.(func(bool))(int8(hidden) != 0)
	} else {
		NewWidgetFromPointer(ptr).SetHiddenDefault(int8(hidden) != 0)
	}
}

func (ptr *Widget) SetHiddenDefault(hidden bool) {
	if ptr.Pointer() != nil {
		C.Widget_SetHiddenDefault(ptr.Pointer(), C.char(int8(qt.GoBoolToInt(hidden))))
	}
}

//export callbackWidget_SetStyleSheet
func callbackWidget_SetStyleSheet(ptr unsafe.Pointer, styleSheet C.struct_Moc_PackedString) {
	if signal := qt.GetSignal(ptr, "setStyleSheet"); signal != nil {
		signal.(func(string))(cGoUnpackString(styleSheet))
	} else {
		NewWidgetFromPointer(ptr).SetStyleSheetDefault(cGoUnpackString(styleSheet))
	}
}

func (ptr *Widget) SetStyleSheetDefault(styleSheet string) {
	if ptr.Pointer() != nil {
		var styleSheetC *C.char
		if styleSheet != "" {
			styleSheetC = C.CString(styleSheet)
			defer C.free(unsafe.Pointer(styleSheetC))
		}
		C.Widget_SetStyleSheetDefault(ptr.Pointer(), C.struct_Moc_PackedString{data: styleSheetC, len: C.longlong(len(styleSheet))})
	}
}

//export callbackWidget_SetVisible
func callbackWidget_SetVisible(ptr unsafe.Pointer, visible C.char) {
	if signal := qt.GetSignal(ptr, "setVisible"); signal != nil {
		signal.(func(bool))(int8(visible) != 0)
	} else {
		NewWidgetFromPointer(ptr).SetVisibleDefault(int8(visible) != 0)
	}
}

func (ptr *Widget) SetVisibleDefault(visible bool) {
	if ptr.Pointer() != nil {
		C.Widget_SetVisibleDefault(ptr.Pointer(), C.char(int8(qt.GoBoolToInt(visible))))
	}
}

//export callbackWidget_SetWindowModified
func callbackWidget_SetWindowModified(ptr unsafe.Pointer, vbo C.char) {
	if signal := qt.GetSignal(ptr, "setWindowModified"); signal != nil {
		signal.(func(bool))(int8(vbo) != 0)
	} else {
		NewWidgetFromPointer(ptr).SetWindowModifiedDefault(int8(vbo) != 0)
	}
}

func (ptr *Widget) SetWindowModifiedDefault(vbo bool) {
	if ptr.Pointer() != nil {
		C.Widget_SetWindowModifiedDefault(ptr.Pointer(), C.char(int8(qt.GoBoolToInt(vbo))))
	}
}

//export callbackWidget_SetWindowTitle
func callbackWidget_SetWindowTitle(ptr unsafe.Pointer, vqs C.struct_Moc_PackedString) {
	if signal := qt.GetSignal(ptr, "setWindowTitle"); signal != nil {
		signal.(func(string))(cGoUnpackString(vqs))
	} else {
		NewWidgetFromPointer(ptr).SetWindowTitleDefault(cGoUnpackString(vqs))
	}
}

func (ptr *Widget) SetWindowTitleDefault(vqs string) {
	if ptr.Pointer() != nil {
		var vqsC *C.char
		if vqs != "" {
			vqsC = C.CString(vqs)
			defer C.free(unsafe.Pointer(vqsC))
		}
		C.Widget_SetWindowTitleDefault(ptr.Pointer(), C.struct_Moc_PackedString{data: vqsC, len: C.longlong(len(vqs))})
	}
}

//export callbackWidget_Show
func callbackWidget_Show(ptr unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "show"); signal != nil {
		signal.(func())()
	} else {
		NewWidgetFromPointer(ptr).ShowDefault()
	}
}

func (ptr *Widget) ShowDefault() {
	if ptr.Pointer() != nil {
		C.Widget_ShowDefault(ptr.Pointer())
	}
}

//export callbackWidget_ShowEvent
func callbackWidget_ShowEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "showEvent"); signal != nil {
		signal.(func(*std_gui.QShowEvent))(std_gui.NewQShowEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).ShowEventDefault(std_gui.NewQShowEventFromPointer(event))
	}
}

func (ptr *Widget) ShowEventDefault(event std_gui.QShowEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_ShowEventDefault(ptr.Pointer(), std_gui.PointerFromQShowEvent(event))
	}
}

//export callbackWidget_ShowFullScreen
func callbackWidget_ShowFullScreen(ptr unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "showFullScreen"); signal != nil {
		signal.(func())()
	} else {
		NewWidgetFromPointer(ptr).ShowFullScreenDefault()
	}
}

func (ptr *Widget) ShowFullScreenDefault() {
	if ptr.Pointer() != nil {
		C.Widget_ShowFullScreenDefault(ptr.Pointer())
	}
}

//export callbackWidget_ShowMaximized
func callbackWidget_ShowMaximized(ptr unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "showMaximized"); signal != nil {
		signal.(func())()
	} else {
		NewWidgetFromPointer(ptr).ShowMaximizedDefault()
	}
}

func (ptr *Widget) ShowMaximizedDefault() {
	if ptr.Pointer() != nil {
		C.Widget_ShowMaximizedDefault(ptr.Pointer())
	}
}

//export callbackWidget_ShowMinimized
func callbackWidget_ShowMinimized(ptr unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "showMinimized"); signal != nil {
		signal.(func())()
	} else {
		NewWidgetFromPointer(ptr).ShowMinimizedDefault()
	}
}

func (ptr *Widget) ShowMinimizedDefault() {
	if ptr.Pointer() != nil {
		C.Widget_ShowMinimizedDefault(ptr.Pointer())
	}
}

//export callbackWidget_ShowNormal
func callbackWidget_ShowNormal(ptr unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "showNormal"); signal != nil {
		signal.(func())()
	} else {
		NewWidgetFromPointer(ptr).ShowNormalDefault()
	}
}

func (ptr *Widget) ShowNormalDefault() {
	if ptr.Pointer() != nil {
		C.Widget_ShowNormalDefault(ptr.Pointer())
	}
}

//export callbackWidget_TabletEvent
func callbackWidget_TabletEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "tabletEvent"); signal != nil {
		signal.(func(*std_gui.QTabletEvent))(std_gui.NewQTabletEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).TabletEventDefault(std_gui.NewQTabletEventFromPointer(event))
	}
}

func (ptr *Widget) TabletEventDefault(event std_gui.QTabletEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_TabletEventDefault(ptr.Pointer(), std_gui.PointerFromQTabletEvent(event))
	}
}

//export callbackWidget_Update
func callbackWidget_Update(ptr unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "update"); signal != nil {
		signal.(func())()
	} else {
		NewWidgetFromPointer(ptr).UpdateDefault()
	}
}

func (ptr *Widget) UpdateDefault() {
	if ptr.Pointer() != nil {
		C.Widget_UpdateDefault(ptr.Pointer())
	}
}

//export callbackWidget_UpdateMicroFocus
func callbackWidget_UpdateMicroFocus(ptr unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "updateMicroFocus"); signal != nil {
		signal.(func())()
	} else {
		NewWidgetFromPointer(ptr).UpdateMicroFocusDefault()
	}
}

func (ptr *Widget) UpdateMicroFocusDefault() {
	if ptr.Pointer() != nil {
		C.Widget_UpdateMicroFocusDefault(ptr.Pointer())
	}
}

//export callbackWidget_WheelEvent
func callbackWidget_WheelEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "wheelEvent"); signal != nil {
		signal.(func(*std_gui.QWheelEvent))(std_gui.NewQWheelEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).WheelEventDefault(std_gui.NewQWheelEventFromPointer(event))
	}
}

func (ptr *Widget) WheelEventDefault(event std_gui.QWheelEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_WheelEventDefault(ptr.Pointer(), std_gui.PointerFromQWheelEvent(event))
	}
}

//export callbackWidget_WindowIconChanged
func callbackWidget_WindowIconChanged(ptr unsafe.Pointer, icon unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "windowIconChanged"); signal != nil {
		signal.(func(*std_gui.QIcon))(std_gui.NewQIconFromPointer(icon))
	}

}

//export callbackWidget_WindowTitleChanged
func callbackWidget_WindowTitleChanged(ptr unsafe.Pointer, title C.struct_Moc_PackedString) {
	if signal := qt.GetSignal(ptr, "windowTitleChanged"); signal != nil {
		signal.(func(string))(cGoUnpackString(title))
	}

}

//export callbackWidget_PaintEngine
func callbackWidget_PaintEngine(ptr unsafe.Pointer) unsafe.Pointer {
	if signal := qt.GetSignal(ptr, "paintEngine"); signal != nil {
		return std_gui.PointerFromQPaintEngine(signal.(func() *std_gui.QPaintEngine)())
	}

	return std_gui.PointerFromQPaintEngine(NewWidgetFromPointer(ptr).PaintEngineDefault())
}

func (ptr *Widget) PaintEngineDefault() *std_gui.QPaintEngine {
	if ptr.Pointer() != nil {
		return std_gui.NewQPaintEngineFromPointer(C.Widget_PaintEngineDefault(ptr.Pointer()))
	}
	return nil
}

//export callbackWidget_MinimumSizeHint
func callbackWidget_MinimumSizeHint(ptr unsafe.Pointer) unsafe.Pointer {
	if signal := qt.GetSignal(ptr, "minimumSizeHint"); signal != nil {
		return std_core.PointerFromQSize(signal.(func() *std_core.QSize)())
	}

	return std_core.PointerFromQSize(NewWidgetFromPointer(ptr).MinimumSizeHintDefault())
}

func (ptr *Widget) MinimumSizeHintDefault() *std_core.QSize {
	if ptr.Pointer() != nil {
		var tmpValue = std_core.NewQSizeFromPointer(C.Widget_MinimumSizeHintDefault(ptr.Pointer()))
		runtime.SetFinalizer(tmpValue, (*std_core.QSize).DestroyQSize)
		return tmpValue
	}
	return nil
}

//export callbackWidget_SizeHint
func callbackWidget_SizeHint(ptr unsafe.Pointer) unsafe.Pointer {
	if signal := qt.GetSignal(ptr, "sizeHint"); signal != nil {
		return std_core.PointerFromQSize(signal.(func() *std_core.QSize)())
	}

	return std_core.PointerFromQSize(NewWidgetFromPointer(ptr).SizeHintDefault())
}

func (ptr *Widget) SizeHintDefault() *std_core.QSize {
	if ptr.Pointer() != nil {
		var tmpValue = std_core.NewQSizeFromPointer(C.Widget_SizeHintDefault(ptr.Pointer()))
		runtime.SetFinalizer(tmpValue, (*std_core.QSize).DestroyQSize)
		return tmpValue
	}
	return nil
}

//export callbackWidget_InputMethodQuery
func callbackWidget_InputMethodQuery(ptr unsafe.Pointer, query C.longlong) unsafe.Pointer {
	if signal := qt.GetSignal(ptr, "inputMethodQuery"); signal != nil {
		return std_core.PointerFromQVariant(signal.(func(std_core.Qt__InputMethodQuery) *std_core.QVariant)(std_core.Qt__InputMethodQuery(query)))
	}

	return std_core.PointerFromQVariant(NewWidgetFromPointer(ptr).InputMethodQueryDefault(std_core.Qt__InputMethodQuery(query)))
}

func (ptr *Widget) InputMethodQueryDefault(query std_core.Qt__InputMethodQuery) *std_core.QVariant {
	if ptr.Pointer() != nil {
		var tmpValue = std_core.NewQVariantFromPointer(C.Widget_InputMethodQueryDefault(ptr.Pointer(), C.longlong(query)))
		runtime.SetFinalizer(tmpValue, (*std_core.QVariant).DestroyQVariant)
		return tmpValue
	}
	return nil
}

//export callbackWidget_HasHeightForWidth
func callbackWidget_HasHeightForWidth(ptr unsafe.Pointer) C.char {
	if signal := qt.GetSignal(ptr, "hasHeightForWidth"); signal != nil {
		return C.char(int8(qt.GoBoolToInt(signal.(func() bool)())))
	}

	return C.char(int8(qt.GoBoolToInt(NewWidgetFromPointer(ptr).HasHeightForWidthDefault())))
}

func (ptr *Widget) HasHeightForWidthDefault() bool {
	if ptr.Pointer() != nil {
		return C.Widget_HasHeightForWidthDefault(ptr.Pointer()) != 0
	}
	return false
}

//export callbackWidget_HeightForWidth
func callbackWidget_HeightForWidth(ptr unsafe.Pointer, w C.int) C.int {
	if signal := qt.GetSignal(ptr, "heightForWidth"); signal != nil {
		return C.int(int32(signal.(func(int) int)(int(int32(w)))))
	}

	return C.int(int32(NewWidgetFromPointer(ptr).HeightForWidthDefault(int(int32(w)))))
}

func (ptr *Widget) HeightForWidthDefault(w int) int {
	if ptr.Pointer() != nil {
		return int(int32(C.Widget_HeightForWidthDefault(ptr.Pointer(), C.int(int32(w)))))
	}
	return 0
}

//export callbackWidget_Metric
func callbackWidget_Metric(ptr unsafe.Pointer, m C.longlong) C.int {
	if signal := qt.GetSignal(ptr, "metric"); signal != nil {
		return C.int(int32(signal.(func(std_gui.QPaintDevice__PaintDeviceMetric) int)(std_gui.QPaintDevice__PaintDeviceMetric(m))))
	}

	return C.int(int32(NewWidgetFromPointer(ptr).MetricDefault(std_gui.QPaintDevice__PaintDeviceMetric(m))))
}

func (ptr *Widget) MetricDefault(m std_gui.QPaintDevice__PaintDeviceMetric) int {
	if ptr.Pointer() != nil {
		return int(int32(C.Widget_MetricDefault(ptr.Pointer(), C.longlong(m))))
	}
	return 0
}

//export callbackWidget_EventFilter
func callbackWidget_EventFilter(ptr unsafe.Pointer, watched unsafe.Pointer, event unsafe.Pointer) C.char {
	if signal := qt.GetSignal(ptr, "eventFilter"); signal != nil {
		return C.char(int8(qt.GoBoolToInt(signal.(func(*std_core.QObject, *std_core.QEvent) bool)(std_core.NewQObjectFromPointer(watched), std_core.NewQEventFromPointer(event)))))
	}

	return C.char(int8(qt.GoBoolToInt(NewWidgetFromPointer(ptr).EventFilterDefault(std_core.NewQObjectFromPointer(watched), std_core.NewQEventFromPointer(event)))))
}

func (ptr *Widget) EventFilterDefault(watched std_core.QObject_ITF, event std_core.QEvent_ITF) bool {
	if ptr.Pointer() != nil {
		return C.Widget_EventFilterDefault(ptr.Pointer(), std_core.PointerFromQObject(watched), std_core.PointerFromQEvent(event)) != 0
	}
	return false
}

//export callbackWidget_ChildEvent
func callbackWidget_ChildEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "childEvent"); signal != nil {
		signal.(func(*std_core.QChildEvent))(std_core.NewQChildEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).ChildEventDefault(std_core.NewQChildEventFromPointer(event))
	}
}

func (ptr *Widget) ChildEventDefault(event std_core.QChildEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_ChildEventDefault(ptr.Pointer(), std_core.PointerFromQChildEvent(event))
	}
}

//export callbackWidget_ConnectNotify
func callbackWidget_ConnectNotify(ptr unsafe.Pointer, sign unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "connectNotify"); signal != nil {
		signal.(func(*std_core.QMetaMethod))(std_core.NewQMetaMethodFromPointer(sign))
	} else {
		NewWidgetFromPointer(ptr).ConnectNotifyDefault(std_core.NewQMetaMethodFromPointer(sign))
	}
}

func (ptr *Widget) ConnectNotifyDefault(sign std_core.QMetaMethod_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_ConnectNotifyDefault(ptr.Pointer(), std_core.PointerFromQMetaMethod(sign))
	}
}

//export callbackWidget_CustomEvent
func callbackWidget_CustomEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "customEvent"); signal != nil {
		signal.(func(*std_core.QEvent))(std_core.NewQEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).CustomEventDefault(std_core.NewQEventFromPointer(event))
	}
}

func (ptr *Widget) CustomEventDefault(event std_core.QEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_CustomEventDefault(ptr.Pointer(), std_core.PointerFromQEvent(event))
	}
}

//export callbackWidget_DeleteLater
func callbackWidget_DeleteLater(ptr unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "deleteLater"); signal != nil {
		signal.(func())()
	} else {
		NewWidgetFromPointer(ptr).DeleteLaterDefault()
	}
}

func (ptr *Widget) DeleteLaterDefault() {
	if ptr.Pointer() != nil {
		C.Widget_DeleteLaterDefault(ptr.Pointer())
		ptr.SetPointer(nil)
		runtime.SetFinalizer(ptr, nil)
	}
}

//export callbackWidget_Destroyed
func callbackWidget_Destroyed(ptr unsafe.Pointer, obj unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "destroyed"); signal != nil {
		signal.(func(*std_core.QObject))(std_core.NewQObjectFromPointer(obj))
	}

}

//export callbackWidget_DisconnectNotify
func callbackWidget_DisconnectNotify(ptr unsafe.Pointer, sign unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "disconnectNotify"); signal != nil {
		signal.(func(*std_core.QMetaMethod))(std_core.NewQMetaMethodFromPointer(sign))
	} else {
		NewWidgetFromPointer(ptr).DisconnectNotifyDefault(std_core.NewQMetaMethodFromPointer(sign))
	}
}

func (ptr *Widget) DisconnectNotifyDefault(sign std_core.QMetaMethod_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_DisconnectNotifyDefault(ptr.Pointer(), std_core.PointerFromQMetaMethod(sign))
	}
}

//export callbackWidget_ObjectNameChanged
func callbackWidget_ObjectNameChanged(ptr unsafe.Pointer, objectName C.struct_Moc_PackedString) {
	if signal := qt.GetSignal(ptr, "objectNameChanged"); signal != nil {
		signal.(func(string))(cGoUnpackString(objectName))
	}

}

//export callbackWidget_TimerEvent
func callbackWidget_TimerEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "timerEvent"); signal != nil {
		signal.(func(*std_core.QTimerEvent))(std_core.NewQTimerEventFromPointer(event))
	} else {
		NewWidgetFromPointer(ptr).TimerEventDefault(std_core.NewQTimerEventFromPointer(event))
	}
}

func (ptr *Widget) TimerEventDefault(event std_core.QTimerEvent_ITF) {
	if ptr.Pointer() != nil {
		C.Widget_TimerEventDefault(ptr.Pointer(), std_core.PointerFromQTimerEvent(event))
	}
}

type XYSeriesIODevice_ITF interface {
	std_core.QIODevice_ITF
	XYSeriesIODevice_PTR() *XYSeriesIODevice
}

func (ptr *XYSeriesIODevice) XYSeriesIODevice_PTR() *XYSeriesIODevice {
	return ptr
}

func (ptr *XYSeriesIODevice) Pointer() unsafe.Pointer {
	if ptr != nil {
		return ptr.QIODevice_PTR().Pointer()
	}
	return nil
}

func (ptr *XYSeriesIODevice) SetPointer(p unsafe.Pointer) {
	if ptr != nil {
		ptr.QIODevice_PTR().SetPointer(p)
	}
}

func PointerFromXYSeriesIODevice(ptr XYSeriesIODevice_ITF) unsafe.Pointer {
	if ptr != nil {
		return ptr.XYSeriesIODevice_PTR().Pointer()
	}
	return nil
}

func NewXYSeriesIODeviceFromPointer(ptr unsafe.Pointer) *XYSeriesIODevice {
	var n *XYSeriesIODevice
	if gPtr, ok := qt.Receive(ptr); !ok {
		n = new(XYSeriesIODevice)
		n.SetPointer(ptr)
	} else {
		switch deduced := gPtr.(type) {
		case *XYSeriesIODevice:
			n = deduced

		case *std_core.QIODevice:
			n = &XYSeriesIODevice{QIODevice: *deduced}

		default:
			n = new(XYSeriesIODevice)
			n.SetPointer(ptr)
		}
	}
	return n
}

//export callbackXYSeriesIODevice_Constructor
func callbackXYSeriesIODevice_Constructor(ptr unsafe.Pointer) {
	gPtr := NewXYSeriesIODeviceFromPointer(ptr)
	qt.Register(ptr, gPtr)
}

func XYSeriesIODevice_QRegisterMetaType() int {
	return int(int32(C.XYSeriesIODevice_XYSeriesIODevice_QRegisterMetaType()))
}

func (ptr *XYSeriesIODevice) QRegisterMetaType() int {
	return int(int32(C.XYSeriesIODevice_XYSeriesIODevice_QRegisterMetaType()))
}

func XYSeriesIODevice_QRegisterMetaType2(typeName string) int {
	var typeNameC *C.char
	if typeName != "" {
		typeNameC = C.CString(typeName)
		defer C.free(unsafe.Pointer(typeNameC))
	}
	return int(int32(C.XYSeriesIODevice_XYSeriesIODevice_QRegisterMetaType2(typeNameC)))
}

func (ptr *XYSeriesIODevice) QRegisterMetaType2(typeName string) int {
	var typeNameC *C.char
	if typeName != "" {
		typeNameC = C.CString(typeName)
		defer C.free(unsafe.Pointer(typeNameC))
	}
	return int(int32(C.XYSeriesIODevice_XYSeriesIODevice_QRegisterMetaType2(typeNameC)))
}

func XYSeriesIODevice_QmlRegisterType() int {
	return int(int32(C.XYSeriesIODevice_XYSeriesIODevice_QmlRegisterType()))
}

func (ptr *XYSeriesIODevice) QmlRegisterType() int {
	return int(int32(C.XYSeriesIODevice_XYSeriesIODevice_QmlRegisterType()))
}

func XYSeriesIODevice_QmlRegisterType2(uri string, versionMajor int, versionMinor int, qmlName string) int {
	var uriC *C.char
	if uri != "" {
		uriC = C.CString(uri)
		defer C.free(unsafe.Pointer(uriC))
	}
	var qmlNameC *C.char
	if qmlName != "" {
		qmlNameC = C.CString(qmlName)
		defer C.free(unsafe.Pointer(qmlNameC))
	}
	return int(int32(C.XYSeriesIODevice_XYSeriesIODevice_QmlRegisterType2(uriC, C.int(int32(versionMajor)), C.int(int32(versionMinor)), qmlNameC)))
}

func (ptr *XYSeriesIODevice) QmlRegisterType2(uri string, versionMajor int, versionMinor int, qmlName string) int {
	var uriC *C.char
	if uri != "" {
		uriC = C.CString(uri)
		defer C.free(unsafe.Pointer(uriC))
	}
	var qmlNameC *C.char
	if qmlName != "" {
		qmlNameC = C.CString(qmlName)
		defer C.free(unsafe.Pointer(qmlNameC))
	}
	return int(int32(C.XYSeriesIODevice_XYSeriesIODevice_QmlRegisterType2(uriC, C.int(int32(versionMajor)), C.int(int32(versionMinor)), qmlNameC)))
}

func (ptr *XYSeriesIODevice) __dynamicPropertyNames_atList(i int) *std_core.QByteArray {
	if ptr.Pointer() != nil {
		var tmpValue = std_core.NewQByteArrayFromPointer(C.XYSeriesIODevice___dynamicPropertyNames_atList(ptr.Pointer(), C.int(int32(i))))
		runtime.SetFinalizer(tmpValue, (*std_core.QByteArray).DestroyQByteArray)
		return tmpValue
	}
	return nil
}

func (ptr *XYSeriesIODevice) __dynamicPropertyNames_setList(i std_core.QByteArray_ITF) {
	if ptr.Pointer() != nil {
		C.XYSeriesIODevice___dynamicPropertyNames_setList(ptr.Pointer(), std_core.PointerFromQByteArray(i))
	}
}

func (ptr *XYSeriesIODevice) __dynamicPropertyNames_newList() unsafe.Pointer {
	return unsafe.Pointer(C.XYSeriesIODevice___dynamicPropertyNames_newList(ptr.Pointer()))
}

func (ptr *XYSeriesIODevice) __findChildren_atList2(i int) *std_core.QObject {
	if ptr.Pointer() != nil {
		var tmpValue = std_core.NewQObjectFromPointer(C.XYSeriesIODevice___findChildren_atList2(ptr.Pointer(), C.int(int32(i))))
		if !qt.ExistsSignal(tmpValue.Pointer(), "destroyed") {
			tmpValue.ConnectDestroyed(func(*std_core.QObject) { tmpValue.SetPointer(nil) })
		}
		return tmpValue
	}
	return nil
}

func (ptr *XYSeriesIODevice) __findChildren_setList2(i std_core.QObject_ITF) {
	if ptr.Pointer() != nil {
		C.XYSeriesIODevice___findChildren_setList2(ptr.Pointer(), std_core.PointerFromQObject(i))
	}
}

func (ptr *XYSeriesIODevice) __findChildren_newList2() unsafe.Pointer {
	return unsafe.Pointer(C.XYSeriesIODevice___findChildren_newList2(ptr.Pointer()))
}

func (ptr *XYSeriesIODevice) __findChildren_atList3(i int) *std_core.QObject {
	if ptr.Pointer() != nil {
		var tmpValue = std_core.NewQObjectFromPointer(C.XYSeriesIODevice___findChildren_atList3(ptr.Pointer(), C.int(int32(i))))
		if !qt.ExistsSignal(tmpValue.Pointer(), "destroyed") {
			tmpValue.ConnectDestroyed(func(*std_core.QObject) { tmpValue.SetPointer(nil) })
		}
		return tmpValue
	}
	return nil
}

func (ptr *XYSeriesIODevice) __findChildren_setList3(i std_core.QObject_ITF) {
	if ptr.Pointer() != nil {
		C.XYSeriesIODevice___findChildren_setList3(ptr.Pointer(), std_core.PointerFromQObject(i))
	}
}

func (ptr *XYSeriesIODevice) __findChildren_newList3() unsafe.Pointer {
	return unsafe.Pointer(C.XYSeriesIODevice___findChildren_newList3(ptr.Pointer()))
}

func (ptr *XYSeriesIODevice) __findChildren_atList(i int) *std_core.QObject {
	if ptr.Pointer() != nil {
		var tmpValue = std_core.NewQObjectFromPointer(C.XYSeriesIODevice___findChildren_atList(ptr.Pointer(), C.int(int32(i))))
		if !qt.ExistsSignal(tmpValue.Pointer(), "destroyed") {
			tmpValue.ConnectDestroyed(func(*std_core.QObject) { tmpValue.SetPointer(nil) })
		}
		return tmpValue
	}
	return nil
}

func (ptr *XYSeriesIODevice) __findChildren_setList(i std_core.QObject_ITF) {
	if ptr.Pointer() != nil {
		C.XYSeriesIODevice___findChildren_setList(ptr.Pointer(), std_core.PointerFromQObject(i))
	}
}

func (ptr *XYSeriesIODevice) __findChildren_newList() unsafe.Pointer {
	return unsafe.Pointer(C.XYSeriesIODevice___findChildren_newList(ptr.Pointer()))
}

func (ptr *XYSeriesIODevice) __children_atList(i int) *std_core.QObject {
	if ptr.Pointer() != nil {
		var tmpValue = std_core.NewQObjectFromPointer(C.XYSeriesIODevice___children_atList(ptr.Pointer(), C.int(int32(i))))
		if !qt.ExistsSignal(tmpValue.Pointer(), "destroyed") {
			tmpValue.ConnectDestroyed(func(*std_core.QObject) { tmpValue.SetPointer(nil) })
		}
		return tmpValue
	}
	return nil
}

func (ptr *XYSeriesIODevice) __children_setList(i std_core.QObject_ITF) {
	if ptr.Pointer() != nil {
		C.XYSeriesIODevice___children_setList(ptr.Pointer(), std_core.PointerFromQObject(i))
	}
}

func (ptr *XYSeriesIODevice) __children_newList() unsafe.Pointer {
	return unsafe.Pointer(C.XYSeriesIODevice___children_newList(ptr.Pointer()))
}

func NewXYSeriesIODevice2(parent std_core.QObject_ITF) *XYSeriesIODevice {
	var tmpValue = NewXYSeriesIODeviceFromPointer(C.XYSeriesIODevice_NewXYSeriesIODevice2(std_core.PointerFromQObject(parent)))
	if !qt.ExistsSignal(tmpValue.Pointer(), "destroyed") {
		tmpValue.ConnectDestroyed(func(*std_core.QObject) { tmpValue.SetPointer(nil) })
	}
	return tmpValue
}

func NewXYSeriesIODevice() *XYSeriesIODevice {
	var tmpValue = NewXYSeriesIODeviceFromPointer(C.XYSeriesIODevice_NewXYSeriesIODevice())
	if !qt.ExistsSignal(tmpValue.Pointer(), "destroyed") {
		tmpValue.ConnectDestroyed(func(*std_core.QObject) { tmpValue.SetPointer(nil) })
	}
	return tmpValue
}

//export callbackXYSeriesIODevice_DestroyXYSeriesIODevice
func callbackXYSeriesIODevice_DestroyXYSeriesIODevice(ptr unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "~XYSeriesIODevice"); signal != nil {
		signal.(func())()
	} else {
		NewXYSeriesIODeviceFromPointer(ptr).DestroyXYSeriesIODeviceDefault()
	}
}

func (ptr *XYSeriesIODevice) ConnectDestroyXYSeriesIODevice(f func()) {
	if ptr.Pointer() != nil {

		if signal := qt.LendSignal(ptr.Pointer(), "~XYSeriesIODevice"); signal != nil {
			qt.ConnectSignal(ptr.Pointer(), "~XYSeriesIODevice", func() {
				signal.(func())()
				f()
			})
		} else {
			qt.ConnectSignal(ptr.Pointer(), "~XYSeriesIODevice", f)
		}
	}
}

func (ptr *XYSeriesIODevice) DisconnectDestroyXYSeriesIODevice() {
	if ptr.Pointer() != nil {

		qt.DisconnectSignal(ptr.Pointer(), "~XYSeriesIODevice")
	}
}

func (ptr *XYSeriesIODevice) DestroyXYSeriesIODevice() {
	if ptr.Pointer() != nil {
		C.XYSeriesIODevice_DestroyXYSeriesIODevice(ptr.Pointer())
		ptr.SetPointer(nil)
		runtime.SetFinalizer(ptr, nil)
	}
}

func (ptr *XYSeriesIODevice) DestroyXYSeriesIODeviceDefault() {
	if ptr.Pointer() != nil {
		C.XYSeriesIODevice_DestroyXYSeriesIODeviceDefault(ptr.Pointer())
		ptr.SetPointer(nil)
		runtime.SetFinalizer(ptr, nil)
	}
}

//export callbackXYSeriesIODevice_Open
func callbackXYSeriesIODevice_Open(ptr unsafe.Pointer, mode C.longlong) C.char {
	if signal := qt.GetSignal(ptr, "open"); signal != nil {
		return C.char(int8(qt.GoBoolToInt(signal.(func(std_core.QIODevice__OpenModeFlag) bool)(std_core.QIODevice__OpenModeFlag(mode)))))
	}

	return C.char(int8(qt.GoBoolToInt(NewXYSeriesIODeviceFromPointer(ptr).OpenDefault(std_core.QIODevice__OpenModeFlag(mode)))))
}

func (ptr *XYSeriesIODevice) OpenDefault(mode std_core.QIODevice__OpenModeFlag) bool {
	if ptr.Pointer() != nil {
		return C.XYSeriesIODevice_OpenDefault(ptr.Pointer(), C.longlong(mode)) != 0
	}
	return false
}

//export callbackXYSeriesIODevice_Reset
func callbackXYSeriesIODevice_Reset(ptr unsafe.Pointer) C.char {
	if signal := qt.GetSignal(ptr, "reset"); signal != nil {
		return C.char(int8(qt.GoBoolToInt(signal.(func() bool)())))
	}

	return C.char(int8(qt.GoBoolToInt(NewXYSeriesIODeviceFromPointer(ptr).ResetDefault())))
}

func (ptr *XYSeriesIODevice) ResetDefault() bool {
	if ptr.Pointer() != nil {
		return C.XYSeriesIODevice_ResetDefault(ptr.Pointer()) != 0
	}
	return false
}

//export callbackXYSeriesIODevice_Seek
func callbackXYSeriesIODevice_Seek(ptr unsafe.Pointer, pos C.longlong) C.char {
	if signal := qt.GetSignal(ptr, "seek"); signal != nil {
		return C.char(int8(qt.GoBoolToInt(signal.(func(int64) bool)(int64(pos)))))
	}

	return C.char(int8(qt.GoBoolToInt(NewXYSeriesIODeviceFromPointer(ptr).SeekDefault(int64(pos)))))
}

func (ptr *XYSeriesIODevice) SeekDefault(pos int64) bool {
	if ptr.Pointer() != nil {
		return C.XYSeriesIODevice_SeekDefault(ptr.Pointer(), C.longlong(pos)) != 0
	}
	return false
}

//export callbackXYSeriesIODevice_WaitForBytesWritten
func callbackXYSeriesIODevice_WaitForBytesWritten(ptr unsafe.Pointer, msecs C.int) C.char {
	if signal := qt.GetSignal(ptr, "waitForBytesWritten"); signal != nil {
		return C.char(int8(qt.GoBoolToInt(signal.(func(int) bool)(int(int32(msecs))))))
	}

	return C.char(int8(qt.GoBoolToInt(NewXYSeriesIODeviceFromPointer(ptr).WaitForBytesWrittenDefault(int(int32(msecs))))))
}

func (ptr *XYSeriesIODevice) WaitForBytesWrittenDefault(msecs int) bool {
	if ptr.Pointer() != nil {
		return C.XYSeriesIODevice_WaitForBytesWrittenDefault(ptr.Pointer(), C.int(int32(msecs))) != 0
	}
	return false
}

//export callbackXYSeriesIODevice_WaitForReadyRead
func callbackXYSeriesIODevice_WaitForReadyRead(ptr unsafe.Pointer, msecs C.int) C.char {
	if signal := qt.GetSignal(ptr, "waitForReadyRead"); signal != nil {
		return C.char(int8(qt.GoBoolToInt(signal.(func(int) bool)(int(int32(msecs))))))
	}

	return C.char(int8(qt.GoBoolToInt(NewXYSeriesIODeviceFromPointer(ptr).WaitForReadyReadDefault(int(int32(msecs))))))
}

func (ptr *XYSeriesIODevice) WaitForReadyReadDefault(msecs int) bool {
	if ptr.Pointer() != nil {
		return C.XYSeriesIODevice_WaitForReadyReadDefault(ptr.Pointer(), C.int(int32(msecs))) != 0
	}
	return false
}

//export callbackXYSeriesIODevice_ReadData
func callbackXYSeriesIODevice_ReadData(ptr unsafe.Pointer, data C.struct_Moc_PackedString, maxSize C.longlong) C.longlong {
	if signal := qt.GetSignal(ptr, "readData"); signal != nil {
		var retS = cGoUnpackString(data)
		var ret = C.longlong(signal.(func(*string, int64) int64)(&retS, int64(maxSize)))
		if ret > 0 {
			C.memcpy(unsafe.Pointer(data.data), unsafe.Pointer(C.CString(retS)), C.size_t(ret))
		}
		return ret
	}
	var retS = cGoUnpackString(data)
	var ret = C.longlong(NewXYSeriesIODeviceFromPointer(ptr).ReadDataDefault(&retS, int64(maxSize)))
	if ret > 0 {
		C.memcpy(unsafe.Pointer(data.data), unsafe.Pointer(C.CString(retS)), C.size_t(ret))
	}
	return ret
}

func (ptr *XYSeriesIODevice) ReadData(data *string, maxSize int64) int64 {
	if ptr.Pointer() != nil {
		var dataC = C.CString(strings.Repeat("0", int(maxSize)))
		defer C.free(unsafe.Pointer(dataC))
		var ret = int64(C.XYSeriesIODevice_ReadData(ptr.Pointer(), dataC, C.longlong(maxSize)))
		if ret > 0 {
			*data = C.GoStringN(dataC, C.int(ret))
		}
		return ret
	}
	return 0
}

func (ptr *XYSeriesIODevice) ReadDataDefault(data *string, maxSize int64) int64 {
	if ptr.Pointer() != nil {
		var dataC = C.CString(strings.Repeat("0", int(maxSize)))
		defer C.free(unsafe.Pointer(dataC))
		var ret = int64(C.XYSeriesIODevice_ReadDataDefault(ptr.Pointer(), dataC, C.longlong(maxSize)))
		if ret > 0 {
			*data = C.GoStringN(dataC, C.int(ret))
		}
		return ret
	}
	return 0
}

//export callbackXYSeriesIODevice_ReadLineData
func callbackXYSeriesIODevice_ReadLineData(ptr unsafe.Pointer, data C.struct_Moc_PackedString, maxSize C.longlong) C.longlong {
	if signal := qt.GetSignal(ptr, "readLineData"); signal != nil {
		return C.longlong(signal.(func(string, int64) int64)(cGoUnpackString(data), int64(maxSize)))
	}

	return C.longlong(NewXYSeriesIODeviceFromPointer(ptr).ReadLineDataDefault(cGoUnpackString(data), int64(maxSize)))
}

func (ptr *XYSeriesIODevice) ReadLineDataDefault(data string, maxSize int64) int64 {
	if ptr.Pointer() != nil {
		var dataC *C.char
		if data != "" {
			dataC = C.CString(data)
			defer C.free(unsafe.Pointer(dataC))
		}
		return int64(C.XYSeriesIODevice_ReadLineDataDefault(ptr.Pointer(), dataC, C.longlong(maxSize)))
	}
	return 0
}

//export callbackXYSeriesIODevice_WriteData
func callbackXYSeriesIODevice_WriteData(ptr unsafe.Pointer, data C.struct_Moc_PackedString, maxSize C.longlong) C.longlong {
	if signal := qt.GetSignal(ptr, "writeData"); signal != nil {
		return C.longlong(signal.(func(string, int64) int64)(cGoUnpackString(data), int64(maxSize)))
	}

	return C.longlong(NewXYSeriesIODeviceFromPointer(ptr).WriteDataDefault(cGoUnpackString(data), int64(maxSize)))
}

func (ptr *XYSeriesIODevice) WriteData(data string, maxSize int64) int64 {
	if ptr.Pointer() != nil {
		var dataC *C.char
		if data != "" {
			dataC = C.CString(data)
			defer C.free(unsafe.Pointer(dataC))
		}
		return int64(C.XYSeriesIODevice_WriteData(ptr.Pointer(), dataC, C.longlong(maxSize)))
	}
	return 0
}

func (ptr *XYSeriesIODevice) WriteDataDefault(data string, maxSize int64) int64 {
	if ptr.Pointer() != nil {
		var dataC *C.char
		if data != "" {
			dataC = C.CString(data)
			defer C.free(unsafe.Pointer(dataC))
		}
		return int64(C.XYSeriesIODevice_WriteDataDefault(ptr.Pointer(), dataC, C.longlong(maxSize)))
	}
	return 0
}

//export callbackXYSeriesIODevice_AboutToClose
func callbackXYSeriesIODevice_AboutToClose(ptr unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "aboutToClose"); signal != nil {
		signal.(func())()
	}

}

//export callbackXYSeriesIODevice_BytesWritten
func callbackXYSeriesIODevice_BytesWritten(ptr unsafe.Pointer, bytes C.longlong) {
	if signal := qt.GetSignal(ptr, "bytesWritten"); signal != nil {
		signal.(func(int64))(int64(bytes))
	}

}

//export callbackXYSeriesIODevice_ChannelBytesWritten
func callbackXYSeriesIODevice_ChannelBytesWritten(ptr unsafe.Pointer, channel C.int, bytes C.longlong) {
	if signal := qt.GetSignal(ptr, "channelBytesWritten"); signal != nil {
		signal.(func(int, int64))(int(int32(channel)), int64(bytes))
	}

}

//export callbackXYSeriesIODevice_ChannelReadyRead
func callbackXYSeriesIODevice_ChannelReadyRead(ptr unsafe.Pointer, channel C.int) {
	if signal := qt.GetSignal(ptr, "channelReadyRead"); signal != nil {
		signal.(func(int))(int(int32(channel)))
	}

}

//export callbackXYSeriesIODevice_Close
func callbackXYSeriesIODevice_Close(ptr unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "close"); signal != nil {
		signal.(func())()
	} else {
		NewXYSeriesIODeviceFromPointer(ptr).CloseDefault()
	}
}

func (ptr *XYSeriesIODevice) CloseDefault() {
	if ptr.Pointer() != nil {
		C.XYSeriesIODevice_CloseDefault(ptr.Pointer())
	}
}

//export callbackXYSeriesIODevice_ReadChannelFinished
func callbackXYSeriesIODevice_ReadChannelFinished(ptr unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "readChannelFinished"); signal != nil {
		signal.(func())()
	}

}

//export callbackXYSeriesIODevice_ReadyRead
func callbackXYSeriesIODevice_ReadyRead(ptr unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "readyRead"); signal != nil {
		signal.(func())()
	}

}

//export callbackXYSeriesIODevice_AtEnd
func callbackXYSeriesIODevice_AtEnd(ptr unsafe.Pointer) C.char {
	if signal := qt.GetSignal(ptr, "atEnd"); signal != nil {
		return C.char(int8(qt.GoBoolToInt(signal.(func() bool)())))
	}

	return C.char(int8(qt.GoBoolToInt(NewXYSeriesIODeviceFromPointer(ptr).AtEndDefault())))
}

func (ptr *XYSeriesIODevice) AtEndDefault() bool {
	if ptr.Pointer() != nil {
		return C.XYSeriesIODevice_AtEndDefault(ptr.Pointer()) != 0
	}
	return false
}

//export callbackXYSeriesIODevice_CanReadLine
func callbackXYSeriesIODevice_CanReadLine(ptr unsafe.Pointer) C.char {
	if signal := qt.GetSignal(ptr, "canReadLine"); signal != nil {
		return C.char(int8(qt.GoBoolToInt(signal.(func() bool)())))
	}

	return C.char(int8(qt.GoBoolToInt(NewXYSeriesIODeviceFromPointer(ptr).CanReadLineDefault())))
}

func (ptr *XYSeriesIODevice) CanReadLineDefault() bool {
	if ptr.Pointer() != nil {
		return C.XYSeriesIODevice_CanReadLineDefault(ptr.Pointer()) != 0
	}
	return false
}

//export callbackXYSeriesIODevice_IsSequential
func callbackXYSeriesIODevice_IsSequential(ptr unsafe.Pointer) C.char {
	if signal := qt.GetSignal(ptr, "isSequential"); signal != nil {
		return C.char(int8(qt.GoBoolToInt(signal.(func() bool)())))
	}

	return C.char(int8(qt.GoBoolToInt(NewXYSeriesIODeviceFromPointer(ptr).IsSequentialDefault())))
}

func (ptr *XYSeriesIODevice) IsSequentialDefault() bool {
	if ptr.Pointer() != nil {
		return C.XYSeriesIODevice_IsSequentialDefault(ptr.Pointer()) != 0
	}
	return false
}

//export callbackXYSeriesIODevice_BytesAvailable
func callbackXYSeriesIODevice_BytesAvailable(ptr unsafe.Pointer) C.longlong {
	if signal := qt.GetSignal(ptr, "bytesAvailable"); signal != nil {
		return C.longlong(signal.(func() int64)())
	}

	return C.longlong(NewXYSeriesIODeviceFromPointer(ptr).BytesAvailableDefault())
}

func (ptr *XYSeriesIODevice) BytesAvailableDefault() int64 {
	if ptr.Pointer() != nil {
		return int64(C.XYSeriesIODevice_BytesAvailableDefault(ptr.Pointer()))
	}
	return 0
}

//export callbackXYSeriesIODevice_BytesToWrite
func callbackXYSeriesIODevice_BytesToWrite(ptr unsafe.Pointer) C.longlong {
	if signal := qt.GetSignal(ptr, "bytesToWrite"); signal != nil {
		return C.longlong(signal.(func() int64)())
	}

	return C.longlong(NewXYSeriesIODeviceFromPointer(ptr).BytesToWriteDefault())
}

func (ptr *XYSeriesIODevice) BytesToWriteDefault() int64 {
	if ptr.Pointer() != nil {
		return int64(C.XYSeriesIODevice_BytesToWriteDefault(ptr.Pointer()))
	}
	return 0
}

//export callbackXYSeriesIODevice_Pos
func callbackXYSeriesIODevice_Pos(ptr unsafe.Pointer) C.longlong {
	if signal := qt.GetSignal(ptr, "pos"); signal != nil {
		return C.longlong(signal.(func() int64)())
	}

	return C.longlong(NewXYSeriesIODeviceFromPointer(ptr).PosDefault())
}

func (ptr *XYSeriesIODevice) PosDefault() int64 {
	if ptr.Pointer() != nil {
		return int64(C.XYSeriesIODevice_PosDefault(ptr.Pointer()))
	}
	return 0
}

//export callbackXYSeriesIODevice_Size
func callbackXYSeriesIODevice_Size(ptr unsafe.Pointer) C.longlong {
	if signal := qt.GetSignal(ptr, "size"); signal != nil {
		return C.longlong(signal.(func() int64)())
	}

	return C.longlong(NewXYSeriesIODeviceFromPointer(ptr).SizeDefault())
}

func (ptr *XYSeriesIODevice) SizeDefault() int64 {
	if ptr.Pointer() != nil {
		return int64(C.XYSeriesIODevice_SizeDefault(ptr.Pointer()))
	}
	return 0
}

//export callbackXYSeriesIODevice_Event
func callbackXYSeriesIODevice_Event(ptr unsafe.Pointer, e unsafe.Pointer) C.char {
	if signal := qt.GetSignal(ptr, "event"); signal != nil {
		return C.char(int8(qt.GoBoolToInt(signal.(func(*std_core.QEvent) bool)(std_core.NewQEventFromPointer(e)))))
	}

	return C.char(int8(qt.GoBoolToInt(NewXYSeriesIODeviceFromPointer(ptr).EventDefault(std_core.NewQEventFromPointer(e)))))
}

func (ptr *XYSeriesIODevice) EventDefault(e std_core.QEvent_ITF) bool {
	if ptr.Pointer() != nil {
		return C.XYSeriesIODevice_EventDefault(ptr.Pointer(), std_core.PointerFromQEvent(e)) != 0
	}
	return false
}

//export callbackXYSeriesIODevice_EventFilter
func callbackXYSeriesIODevice_EventFilter(ptr unsafe.Pointer, watched unsafe.Pointer, event unsafe.Pointer) C.char {
	if signal := qt.GetSignal(ptr, "eventFilter"); signal != nil {
		return C.char(int8(qt.GoBoolToInt(signal.(func(*std_core.QObject, *std_core.QEvent) bool)(std_core.NewQObjectFromPointer(watched), std_core.NewQEventFromPointer(event)))))
	}

	return C.char(int8(qt.GoBoolToInt(NewXYSeriesIODeviceFromPointer(ptr).EventFilterDefault(std_core.NewQObjectFromPointer(watched), std_core.NewQEventFromPointer(event)))))
}

func (ptr *XYSeriesIODevice) EventFilterDefault(watched std_core.QObject_ITF, event std_core.QEvent_ITF) bool {
	if ptr.Pointer() != nil {
		return C.XYSeriesIODevice_EventFilterDefault(ptr.Pointer(), std_core.PointerFromQObject(watched), std_core.PointerFromQEvent(event)) != 0
	}
	return false
}

//export callbackXYSeriesIODevice_ChildEvent
func callbackXYSeriesIODevice_ChildEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "childEvent"); signal != nil {
		signal.(func(*std_core.QChildEvent))(std_core.NewQChildEventFromPointer(event))
	} else {
		NewXYSeriesIODeviceFromPointer(ptr).ChildEventDefault(std_core.NewQChildEventFromPointer(event))
	}
}

func (ptr *XYSeriesIODevice) ChildEventDefault(event std_core.QChildEvent_ITF) {
	if ptr.Pointer() != nil {
		C.XYSeriesIODevice_ChildEventDefault(ptr.Pointer(), std_core.PointerFromQChildEvent(event))
	}
}

//export callbackXYSeriesIODevice_ConnectNotify
func callbackXYSeriesIODevice_ConnectNotify(ptr unsafe.Pointer, sign unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "connectNotify"); signal != nil {
		signal.(func(*std_core.QMetaMethod))(std_core.NewQMetaMethodFromPointer(sign))
	} else {
		NewXYSeriesIODeviceFromPointer(ptr).ConnectNotifyDefault(std_core.NewQMetaMethodFromPointer(sign))
	}
}

func (ptr *XYSeriesIODevice) ConnectNotifyDefault(sign std_core.QMetaMethod_ITF) {
	if ptr.Pointer() != nil {
		C.XYSeriesIODevice_ConnectNotifyDefault(ptr.Pointer(), std_core.PointerFromQMetaMethod(sign))
	}
}

//export callbackXYSeriesIODevice_CustomEvent
func callbackXYSeriesIODevice_CustomEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "customEvent"); signal != nil {
		signal.(func(*std_core.QEvent))(std_core.NewQEventFromPointer(event))
	} else {
		NewXYSeriesIODeviceFromPointer(ptr).CustomEventDefault(std_core.NewQEventFromPointer(event))
	}
}

func (ptr *XYSeriesIODevice) CustomEventDefault(event std_core.QEvent_ITF) {
	if ptr.Pointer() != nil {
		C.XYSeriesIODevice_CustomEventDefault(ptr.Pointer(), std_core.PointerFromQEvent(event))
	}
}

//export callbackXYSeriesIODevice_DeleteLater
func callbackXYSeriesIODevice_DeleteLater(ptr unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "deleteLater"); signal != nil {
		signal.(func())()
	} else {
		NewXYSeriesIODeviceFromPointer(ptr).DeleteLaterDefault()
	}
}

func (ptr *XYSeriesIODevice) DeleteLaterDefault() {
	if ptr.Pointer() != nil {
		C.XYSeriesIODevice_DeleteLaterDefault(ptr.Pointer())
		ptr.SetPointer(nil)
		runtime.SetFinalizer(ptr, nil)
	}
}

//export callbackXYSeriesIODevice_Destroyed
func callbackXYSeriesIODevice_Destroyed(ptr unsafe.Pointer, obj unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "destroyed"); signal != nil {
		signal.(func(*std_core.QObject))(std_core.NewQObjectFromPointer(obj))
	}

}

//export callbackXYSeriesIODevice_DisconnectNotify
func callbackXYSeriesIODevice_DisconnectNotify(ptr unsafe.Pointer, sign unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "disconnectNotify"); signal != nil {
		signal.(func(*std_core.QMetaMethod))(std_core.NewQMetaMethodFromPointer(sign))
	} else {
		NewXYSeriesIODeviceFromPointer(ptr).DisconnectNotifyDefault(std_core.NewQMetaMethodFromPointer(sign))
	}
}

func (ptr *XYSeriesIODevice) DisconnectNotifyDefault(sign std_core.QMetaMethod_ITF) {
	if ptr.Pointer() != nil {
		C.XYSeriesIODevice_DisconnectNotifyDefault(ptr.Pointer(), std_core.PointerFromQMetaMethod(sign))
	}
}

//export callbackXYSeriesIODevice_ObjectNameChanged
func callbackXYSeriesIODevice_ObjectNameChanged(ptr unsafe.Pointer, objectName C.struct_Moc_PackedString) {
	if signal := qt.GetSignal(ptr, "objectNameChanged"); signal != nil {
		signal.(func(string))(cGoUnpackString(objectName))
	}

}

//export callbackXYSeriesIODevice_TimerEvent
func callbackXYSeriesIODevice_TimerEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	if signal := qt.GetSignal(ptr, "timerEvent"); signal != nil {
		signal.(func(*std_core.QTimerEvent))(std_core.NewQTimerEventFromPointer(event))
	} else {
		NewXYSeriesIODeviceFromPointer(ptr).TimerEventDefault(std_core.NewQTimerEventFromPointer(event))
	}
}

func (ptr *XYSeriesIODevice) TimerEventDefault(event std_core.QTimerEvent_ITF) {
	if ptr.Pointer() != nil {
		C.XYSeriesIODevice_TimerEventDefault(ptr.Pointer(), std_core.PointerFromQTimerEvent(event))
	}
}
