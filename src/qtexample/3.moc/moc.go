package main

//#include <stdint.h>
//#include <stdlib.h>
//#include <string.h>
//#include "moc.h"
import "C"
import (
	"runtime"
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

type MocLabel_ITF interface {
	std_widgets.QLabel_ITF
	MocLabel_PTR() *MocLabel
}

func (ptr *MocLabel) MocLabel_PTR() *MocLabel {
	return ptr
}

func (ptr *MocLabel) Pointer() unsafe.Pointer {
	if ptr != nil {
		return ptr.QLabel_PTR().Pointer()
	}
	return nil
}

func (ptr *MocLabel) SetPointer(p unsafe.Pointer) {
	if ptr != nil {
		ptr.QLabel_PTR().SetPointer(p)
	}
}

func PointerFromMocLabel(ptr MocLabel_ITF) unsafe.Pointer {
	if ptr != nil {
		return ptr.MocLabel_PTR().Pointer()
	}
	return nil
}

func NewMocLabelFromPointer(ptr unsafe.Pointer) *MocLabel {
	var n *MocLabel
	if gPtr, ok := qt.Receive(ptr); !ok {
		n = new(MocLabel)
		n.SetPointer(ptr)
	} else {
		switch deduced := gPtr.(type) {
		case *MocLabel:
			n = deduced

		case *std_widgets.QLabel:
			n = &MocLabel{QLabel: *deduced}

		default:
			n = new(MocLabel)
			n.SetPointer(ptr)
		}
	}
	return n
}

//export callbackMocLabel_Constructor
func callbackMocLabel_Constructor(ptr unsafe.Pointer) {
	gPtr := NewMocLabelFromPointer(ptr)
	qt.Register(ptr, gPtr)
}

//export callbackMocLabel_UpdateLabel
func callbackMocLabel_UpdateLabel(ptr unsafe.Pointer, v0 C.int) {
	qt.Debug("	MocLabel                                     callbackMocLabel_UpdateLabel(ptr unsafe.Pointer, v0 C.int) ")
	if signal := qt.GetSignal(ptr, "updateLabel"); signal != nil {
		signal.(func(int))(int(int32(v0)))
	}

}

func (ptr *MocLabel) ConnectUpdateLabel(f func(v0 int)) {
	qt.Debug("	MocLabel                                     ConnectUpdateLabel(f func (v0 int) ) ")
	if ptr.Pointer() != nil {

		if !qt.ExistsSignal(ptr.Pointer(), "updateLabel") {
			C.MocLabel_ConnectUpdateLabel(ptr.Pointer())
		}

		if signal := qt.LendSignal(ptr.Pointer(), "updateLabel"); signal != nil {
			qt.ConnectSignal(ptr.Pointer(), "updateLabel", func(v0 int) {
				signal.(func(int))(v0)
				f(v0)
			})
		} else {
			qt.ConnectSignal(ptr.Pointer(), "updateLabel", f)
		}
	}
}

func (ptr *MocLabel) DisconnectUpdateLabel() {
	qt.Debug("	MocLabel                                     DisconnectUpdateLabel() ")
	if ptr.Pointer() != nil {
		C.MocLabel_DisconnectUpdateLabel(ptr.Pointer())
		qt.DisconnectSignal(ptr.Pointer(), "updateLabel")
	}
}

func (ptr *MocLabel) UpdateLabel(v0 int) {
	qt.Debug("	MocLabel                                     UpdateLabel(v0 int) ")
	if ptr.Pointer() != nil {
		C.MocLabel_UpdateLabel(ptr.Pointer(), C.int(int32(v0)))
	}
}

func MocLabel_QRegisterMetaType() int {
	qt.Debug("	MocLabel                                     MocLabel_QRegisterMetaType() int")
	return int(int32(C.MocLabel_MocLabel_QRegisterMetaType()))
}

func (ptr *MocLabel) QRegisterMetaType() int {
	qt.Debug("	MocLabel                                     MocLabel_QRegisterMetaType() int")
	return int(int32(C.MocLabel_MocLabel_QRegisterMetaType()))
}

func MocLabel_QRegisterMetaType2(typeName string) int {
	qt.Debug("	MocLabel                                     MocLabel_QRegisterMetaType2(typeName string) int")
	var typeNameC *C.char
	if typeName != "" {
		typeNameC = C.CString(typeName)
		defer C.free(unsafe.Pointer(typeNameC))
	}
	return int(int32(C.MocLabel_MocLabel_QRegisterMetaType2(typeNameC)))
}

func (ptr *MocLabel) QRegisterMetaType2(typeName string) int {
	qt.Debug("	MocLabel                                     MocLabel_QRegisterMetaType2(typeName string) int")
	var typeNameC *C.char
	if typeName != "" {
		typeNameC = C.CString(typeName)
		defer C.free(unsafe.Pointer(typeNameC))
	}
	return int(int32(C.MocLabel_MocLabel_QRegisterMetaType2(typeNameC)))
}

func MocLabel_QmlRegisterType() int {
	qt.Debug("	MocLabel                                     MocLabel_QmlRegisterType() int")
	return int(int32(C.MocLabel_MocLabel_QmlRegisterType()))
}

func (ptr *MocLabel) QmlRegisterType() int {
	qt.Debug("	MocLabel                                     MocLabel_QmlRegisterType() int")
	return int(int32(C.MocLabel_MocLabel_QmlRegisterType()))
}

func MocLabel_QmlRegisterType2(uri string, versionMajor int, versionMinor int, qmlName string) int {
	qt.Debug("	MocLabel                                     MocLabel_QmlRegisterType2(uri string, versionMajor int, versionMinor int, qmlName string) int")
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
	return int(int32(C.MocLabel_MocLabel_QmlRegisterType2(uriC, C.int(int32(versionMajor)), C.int(int32(versionMinor)), qmlNameC)))
}

func (ptr *MocLabel) QmlRegisterType2(uri string, versionMajor int, versionMinor int, qmlName string) int {
	qt.Debug("	MocLabel                                     MocLabel_QmlRegisterType2(uri string, versionMajor int, versionMinor int, qmlName string) int")
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
	return int(int32(C.MocLabel_MocLabel_QmlRegisterType2(uriC, C.int(int32(versionMajor)), C.int(int32(versionMinor)), qmlNameC)))
}

func (ptr *MocLabel) __addActions_actions_atList(i int) *std_widgets.QAction {
	qt.Debug("	MocLabel                                     __addActions_actions_atList(i int) *std_widgets.QAction")
	if ptr.Pointer() != nil {
		var tmpValue = std_widgets.NewQActionFromPointer(C.MocLabel___addActions_actions_atList(ptr.Pointer(), C.int(int32(i))))
		if !qt.ExistsSignal(tmpValue.Pointer(), "destroyed") {
			tmpValue.ConnectDestroyed(func(*std_core.QObject) { tmpValue.SetPointer(nil) })
		}
		return tmpValue
	}
	return nil
}

func (ptr *MocLabel) __addActions_actions_setList(i std_widgets.QAction_ITF) {
	qt.Debug("	MocLabel                                     __addActions_actions_setList(i std_widgets.QAction_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel___addActions_actions_setList(ptr.Pointer(), std_widgets.PointerFromQAction(i))
	}
}

func (ptr *MocLabel) __addActions_actions_newList() unsafe.Pointer {
	qt.Debug("	MocLabel                                     __addActions_actions_newList() unsafe.Pointer")
	return unsafe.Pointer(C.MocLabel___addActions_actions_newList(ptr.Pointer()))
}

func (ptr *MocLabel) __insertActions_actions_atList(i int) *std_widgets.QAction {
	qt.Debug("	MocLabel                                     __insertActions_actions_atList(i int) *std_widgets.QAction")
	if ptr.Pointer() != nil {
		var tmpValue = std_widgets.NewQActionFromPointer(C.MocLabel___insertActions_actions_atList(ptr.Pointer(), C.int(int32(i))))
		if !qt.ExistsSignal(tmpValue.Pointer(), "destroyed") {
			tmpValue.ConnectDestroyed(func(*std_core.QObject) { tmpValue.SetPointer(nil) })
		}
		return tmpValue
	}
	return nil
}

func (ptr *MocLabel) __insertActions_actions_setList(i std_widgets.QAction_ITF) {
	qt.Debug("	MocLabel                                     __insertActions_actions_setList(i std_widgets.QAction_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel___insertActions_actions_setList(ptr.Pointer(), std_widgets.PointerFromQAction(i))
	}
}

func (ptr *MocLabel) __insertActions_actions_newList() unsafe.Pointer {
	qt.Debug("	MocLabel                                     __insertActions_actions_newList() unsafe.Pointer")
	return unsafe.Pointer(C.MocLabel___insertActions_actions_newList(ptr.Pointer()))
}

func (ptr *MocLabel) __actions_atList(i int) *std_widgets.QAction {
	qt.Debug("	MocLabel                                     __actions_atList(i int) *std_widgets.QAction")
	if ptr.Pointer() != nil {
		var tmpValue = std_widgets.NewQActionFromPointer(C.MocLabel___actions_atList(ptr.Pointer(), C.int(int32(i))))
		if !qt.ExistsSignal(tmpValue.Pointer(), "destroyed") {
			tmpValue.ConnectDestroyed(func(*std_core.QObject) { tmpValue.SetPointer(nil) })
		}
		return tmpValue
	}
	return nil
}

func (ptr *MocLabel) __actions_setList(i std_widgets.QAction_ITF) {
	qt.Debug("	MocLabel                                     __actions_setList(i std_widgets.QAction_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel___actions_setList(ptr.Pointer(), std_widgets.PointerFromQAction(i))
	}
}

func (ptr *MocLabel) __actions_newList() unsafe.Pointer {
	qt.Debug("	MocLabel                                     __actions_newList() unsafe.Pointer")
	return unsafe.Pointer(C.MocLabel___actions_newList(ptr.Pointer()))
}

func (ptr *MocLabel) __dynamicPropertyNames_atList(i int) *std_core.QByteArray {
	qt.Debug("	MocLabel                                     __dynamicPropertyNames_atList(i int) *std_core.QByteArray")
	if ptr.Pointer() != nil {
		var tmpValue = std_core.NewQByteArrayFromPointer(C.MocLabel___dynamicPropertyNames_atList(ptr.Pointer(), C.int(int32(i))))
		runtime.SetFinalizer(tmpValue, (*std_core.QByteArray).DestroyQByteArray)
		return tmpValue
	}
	return nil
}

func (ptr *MocLabel) __dynamicPropertyNames_setList(i std_core.QByteArray_ITF) {
	qt.Debug("	MocLabel                                     __dynamicPropertyNames_setList(i std_core.QByteArray_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel___dynamicPropertyNames_setList(ptr.Pointer(), std_core.PointerFromQByteArray(i))
	}
}

func (ptr *MocLabel) __dynamicPropertyNames_newList() unsafe.Pointer {
	qt.Debug("	MocLabel                                     __dynamicPropertyNames_newList() unsafe.Pointer")
	return unsafe.Pointer(C.MocLabel___dynamicPropertyNames_newList(ptr.Pointer()))
}

func (ptr *MocLabel) __findChildren_atList2(i int) *std_core.QObject {
	qt.Debug("	MocLabel                                     __findChildren_atList2(i int) *std_core.QObject")
	if ptr.Pointer() != nil {
		var tmpValue = std_core.NewQObjectFromPointer(C.MocLabel___findChildren_atList2(ptr.Pointer(), C.int(int32(i))))
		if !qt.ExistsSignal(tmpValue.Pointer(), "destroyed") {
			tmpValue.ConnectDestroyed(func(*std_core.QObject) { tmpValue.SetPointer(nil) })
		}
		return tmpValue
	}
	return nil
}

func (ptr *MocLabel) __findChildren_setList2(i std_core.QObject_ITF) {
	qt.Debug("	MocLabel                                     __findChildren_setList2(i std_core.QObject_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel___findChildren_setList2(ptr.Pointer(), std_core.PointerFromQObject(i))
	}
}

func (ptr *MocLabel) __findChildren_newList2() unsafe.Pointer {
	qt.Debug("	MocLabel                                     __findChildren_newList2() unsafe.Pointer")
	return unsafe.Pointer(C.MocLabel___findChildren_newList2(ptr.Pointer()))
}

func (ptr *MocLabel) __findChildren_atList3(i int) *std_core.QObject {
	qt.Debug("	MocLabel                                     __findChildren_atList3(i int) *std_core.QObject")
	if ptr.Pointer() != nil {
		var tmpValue = std_core.NewQObjectFromPointer(C.MocLabel___findChildren_atList3(ptr.Pointer(), C.int(int32(i))))
		if !qt.ExistsSignal(tmpValue.Pointer(), "destroyed") {
			tmpValue.ConnectDestroyed(func(*std_core.QObject) { tmpValue.SetPointer(nil) })
		}
		return tmpValue
	}
	return nil
}

func (ptr *MocLabel) __findChildren_setList3(i std_core.QObject_ITF) {
	qt.Debug("	MocLabel                                     __findChildren_setList3(i std_core.QObject_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel___findChildren_setList3(ptr.Pointer(), std_core.PointerFromQObject(i))
	}
}

func (ptr *MocLabel) __findChildren_newList3() unsafe.Pointer {
	qt.Debug("	MocLabel                                     __findChildren_newList3() unsafe.Pointer")
	return unsafe.Pointer(C.MocLabel___findChildren_newList3(ptr.Pointer()))
}

func (ptr *MocLabel) __findChildren_atList(i int) *std_core.QObject {
	qt.Debug("	MocLabel                                     __findChildren_atList(i int) *std_core.QObject")
	if ptr.Pointer() != nil {
		var tmpValue = std_core.NewQObjectFromPointer(C.MocLabel___findChildren_atList(ptr.Pointer(), C.int(int32(i))))
		if !qt.ExistsSignal(tmpValue.Pointer(), "destroyed") {
			tmpValue.ConnectDestroyed(func(*std_core.QObject) { tmpValue.SetPointer(nil) })
		}
		return tmpValue
	}
	return nil
}

func (ptr *MocLabel) __findChildren_setList(i std_core.QObject_ITF) {
	qt.Debug("	MocLabel                                     __findChildren_setList(i std_core.QObject_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel___findChildren_setList(ptr.Pointer(), std_core.PointerFromQObject(i))
	}
}

func (ptr *MocLabel) __findChildren_newList() unsafe.Pointer {
	qt.Debug("	MocLabel                                     __findChildren_newList() unsafe.Pointer")
	return unsafe.Pointer(C.MocLabel___findChildren_newList(ptr.Pointer()))
}

func (ptr *MocLabel) __children_atList(i int) *std_core.QObject {
	qt.Debug("	MocLabel                                     __children_atList(i int) *std_core.QObject")
	if ptr.Pointer() != nil {
		var tmpValue = std_core.NewQObjectFromPointer(C.MocLabel___children_atList(ptr.Pointer(), C.int(int32(i))))
		if !qt.ExistsSignal(tmpValue.Pointer(), "destroyed") {
			tmpValue.ConnectDestroyed(func(*std_core.QObject) { tmpValue.SetPointer(nil) })
		}
		return tmpValue
	}
	return nil
}

func (ptr *MocLabel) __children_setList(i std_core.QObject_ITF) {
	qt.Debug("	MocLabel                                     __children_setList(i std_core.QObject_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel___children_setList(ptr.Pointer(), std_core.PointerFromQObject(i))
	}
}

func (ptr *MocLabel) __children_newList() unsafe.Pointer {
	qt.Debug("	MocLabel                                     __children_newList() unsafe.Pointer")
	return unsafe.Pointer(C.MocLabel___children_newList(ptr.Pointer()))
}

func NewMocLabel(parent std_widgets.QWidget_ITF, fo std_core.Qt__WindowType) *MocLabel {
	qt.Debug("	MocLabel                                     NewMocLabel(parent std_widgets.QWidget_ITF, fo std_core.Qt__WindowType) *MocLabel")
	var tmpValue = NewMocLabelFromPointer(C.MocLabel_NewMocLabel(std_widgets.PointerFromQWidget(parent), C.longlong(fo)))
	if !qt.ExistsSignal(tmpValue.Pointer(), "destroyed") {
		tmpValue.ConnectDestroyed(func(*std_core.QObject) { tmpValue.SetPointer(nil) })
	}
	return tmpValue
}

func NewMocLabel2(text string, parent std_widgets.QWidget_ITF, fo std_core.Qt__WindowType) *MocLabel {
	qt.Debug("	MocLabel                                     NewMocLabel2(text string, parent std_widgets.QWidget_ITF, fo std_core.Qt__WindowType) *MocLabel")
	var textC *C.char
	if text != "" {
		textC = C.CString(text)
		defer C.free(unsafe.Pointer(textC))
	}
	var tmpValue = NewMocLabelFromPointer(C.MocLabel_NewMocLabel2(C.struct_Moc_PackedString{data: textC, len: C.longlong(len(text))}, std_widgets.PointerFromQWidget(parent), C.longlong(fo)))
	if !qt.ExistsSignal(tmpValue.Pointer(), "destroyed") {
		tmpValue.ConnectDestroyed(func(*std_core.QObject) { tmpValue.SetPointer(nil) })
	}
	return tmpValue
}

func (ptr *MocLabel) DestroyMocLabel() {
	qt.Debug("	MocLabel                                     DestroyMocLabel() ")
	if ptr.Pointer() != nil {
		C.MocLabel_DestroyMocLabel(ptr.Pointer())
		ptr.SetPointer(nil)
		runtime.SetFinalizer(ptr, nil)
	}
}

//export callbackMocLabel_Event
func callbackMocLabel_Event(ptr unsafe.Pointer, e unsafe.Pointer) C.char {
	qt.Debug("	MocLabel                                     callbackMocLabel_Event(ptr unsafe.Pointer, e unsafe.Pointer) C.char")
	if signal := qt.GetSignal(ptr, "event"); signal != nil {
		return C.char(int8(qt.GoBoolToInt(signal.(func(*std_core.QEvent) bool)(std_core.NewQEventFromPointer(e)))))
	}

	return C.char(int8(qt.GoBoolToInt(NewMocLabelFromPointer(ptr).EventDefault(std_core.NewQEventFromPointer(e)))))
}

func (ptr *MocLabel) EventDefault(e std_core.QEvent_ITF) bool {
	qt.Debug("	MocLabel                                     EventDefault(e std_core.QEvent_ITF) bool")
	if ptr.Pointer() != nil {
		return C.MocLabel_EventDefault(ptr.Pointer(), std_core.PointerFromQEvent(e)) != 0
	}
	return false
}

//export callbackMocLabel_FocusNextPrevChild
func callbackMocLabel_FocusNextPrevChild(ptr unsafe.Pointer, next C.char) C.char {
	qt.Debug("	MocLabel                                     callbackMocLabel_FocusNextPrevChild(ptr unsafe.Pointer, next C.char) C.char")
	if signal := qt.GetSignal(ptr, "focusNextPrevChild"); signal != nil {
		return C.char(int8(qt.GoBoolToInt(signal.(func(bool) bool)(int8(next) != 0))))
	}

	return C.char(int8(qt.GoBoolToInt(NewMocLabelFromPointer(ptr).FocusNextPrevChildDefault(int8(next) != 0))))
}

func (ptr *MocLabel) FocusNextPrevChildDefault(next bool) bool {
	qt.Debug("	MocLabel                                     FocusNextPrevChildDefault(next bool) bool")
	if ptr.Pointer() != nil {
		return C.MocLabel_FocusNextPrevChildDefault(ptr.Pointer(), C.char(int8(qt.GoBoolToInt(next)))) != 0
	}
	return false
}

//export callbackMocLabel_ChangeEvent
func callbackMocLabel_ChangeEvent(ptr unsafe.Pointer, ev unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_ChangeEvent(ptr unsafe.Pointer, ev unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "changeEvent"); signal != nil {
		signal.(func(*std_core.QEvent))(std_core.NewQEventFromPointer(ev))
	} else {
		NewMocLabelFromPointer(ptr).ChangeEventDefault(std_core.NewQEventFromPointer(ev))
	}
}

func (ptr *MocLabel) ChangeEventDefault(ev std_core.QEvent_ITF) {
	qt.Debug("	MocLabel                                     ChangeEventDefault(ev std_core.QEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_ChangeEventDefault(ptr.Pointer(), std_core.PointerFromQEvent(ev))
	}
}

//export callbackMocLabel_Clear
func callbackMocLabel_Clear(ptr unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_Clear(ptr unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "clear"); signal != nil {
		signal.(func())()
	} else {
		NewMocLabelFromPointer(ptr).ClearDefault()
	}
}

func (ptr *MocLabel) ClearDefault() {
	qt.Debug("	MocLabel                                     ClearDefault() ")
	if ptr.Pointer() != nil {
		C.MocLabel_ClearDefault(ptr.Pointer())
	}
}

//export callbackMocLabel_ContextMenuEvent
func callbackMocLabel_ContextMenuEvent(ptr unsafe.Pointer, ev unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_ContextMenuEvent(ptr unsafe.Pointer, ev unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "contextMenuEvent"); signal != nil {
		signal.(func(*std_gui.QContextMenuEvent))(std_gui.NewQContextMenuEventFromPointer(ev))
	} else {
		NewMocLabelFromPointer(ptr).ContextMenuEventDefault(std_gui.NewQContextMenuEventFromPointer(ev))
	}
}

func (ptr *MocLabel) ContextMenuEventDefault(ev std_gui.QContextMenuEvent_ITF) {
	qt.Debug("	MocLabel                                     ContextMenuEventDefault(ev std_gui.QContextMenuEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_ContextMenuEventDefault(ptr.Pointer(), std_gui.PointerFromQContextMenuEvent(ev))
	}
}

//export callbackMocLabel_FocusInEvent
func callbackMocLabel_FocusInEvent(ptr unsafe.Pointer, ev unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_FocusInEvent(ptr unsafe.Pointer, ev unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "focusInEvent"); signal != nil {
		signal.(func(*std_gui.QFocusEvent))(std_gui.NewQFocusEventFromPointer(ev))
	} else {
		NewMocLabelFromPointer(ptr).FocusInEventDefault(std_gui.NewQFocusEventFromPointer(ev))
	}
}

func (ptr *MocLabel) FocusInEventDefault(ev std_gui.QFocusEvent_ITF) {
	qt.Debug("	MocLabel                                     FocusInEventDefault(ev std_gui.QFocusEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_FocusInEventDefault(ptr.Pointer(), std_gui.PointerFromQFocusEvent(ev))
	}
}

//export callbackMocLabel_FocusOutEvent
func callbackMocLabel_FocusOutEvent(ptr unsafe.Pointer, ev unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_FocusOutEvent(ptr unsafe.Pointer, ev unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "focusOutEvent"); signal != nil {
		signal.(func(*std_gui.QFocusEvent))(std_gui.NewQFocusEventFromPointer(ev))
	} else {
		NewMocLabelFromPointer(ptr).FocusOutEventDefault(std_gui.NewQFocusEventFromPointer(ev))
	}
}

func (ptr *MocLabel) FocusOutEventDefault(ev std_gui.QFocusEvent_ITF) {
	qt.Debug("	MocLabel                                     FocusOutEventDefault(ev std_gui.QFocusEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_FocusOutEventDefault(ptr.Pointer(), std_gui.PointerFromQFocusEvent(ev))
	}
}

//export callbackMocLabel_KeyPressEvent
func callbackMocLabel_KeyPressEvent(ptr unsafe.Pointer, ev unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_KeyPressEvent(ptr unsafe.Pointer, ev unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "keyPressEvent"); signal != nil {
		signal.(func(*std_gui.QKeyEvent))(std_gui.NewQKeyEventFromPointer(ev))
	} else {
		NewMocLabelFromPointer(ptr).KeyPressEventDefault(std_gui.NewQKeyEventFromPointer(ev))
	}
}

func (ptr *MocLabel) KeyPressEventDefault(ev std_gui.QKeyEvent_ITF) {
	qt.Debug("	MocLabel                                     KeyPressEventDefault(ev std_gui.QKeyEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_KeyPressEventDefault(ptr.Pointer(), std_gui.PointerFromQKeyEvent(ev))
	}
}

//export callbackMocLabel_LinkActivated
func callbackMocLabel_LinkActivated(ptr unsafe.Pointer, link C.struct_Moc_PackedString) {
	qt.Debug("	MocLabel                                     callbackMocLabel_LinkActivated(ptr unsafe.Pointer, link C.struct_Moc_PackedString) ")
	if signal := qt.GetSignal(ptr, "linkActivated"); signal != nil {
		signal.(func(string))(cGoUnpackString(link))
	}

}

//export callbackMocLabel_LinkHovered
func callbackMocLabel_LinkHovered(ptr unsafe.Pointer, link C.struct_Moc_PackedString) {
	qt.Debug("	MocLabel                                     callbackMocLabel_LinkHovered(ptr unsafe.Pointer, link C.struct_Moc_PackedString) ")
	if signal := qt.GetSignal(ptr, "linkHovered"); signal != nil {
		signal.(func(string))(cGoUnpackString(link))
	}

}

//export callbackMocLabel_MouseMoveEvent
func callbackMocLabel_MouseMoveEvent(ptr unsafe.Pointer, ev unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_MouseMoveEvent(ptr unsafe.Pointer, ev unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "mouseMoveEvent"); signal != nil {
		signal.(func(*std_gui.QMouseEvent))(std_gui.NewQMouseEventFromPointer(ev))
	} else {
		NewMocLabelFromPointer(ptr).MouseMoveEventDefault(std_gui.NewQMouseEventFromPointer(ev))
	}
}

func (ptr *MocLabel) MouseMoveEventDefault(ev std_gui.QMouseEvent_ITF) {
	qt.Debug("	MocLabel                                     MouseMoveEventDefault(ev std_gui.QMouseEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_MouseMoveEventDefault(ptr.Pointer(), std_gui.PointerFromQMouseEvent(ev))
	}
}

//export callbackMocLabel_MousePressEvent
func callbackMocLabel_MousePressEvent(ptr unsafe.Pointer, ev unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_MousePressEvent(ptr unsafe.Pointer, ev unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "mousePressEvent"); signal != nil {
		signal.(func(*std_gui.QMouseEvent))(std_gui.NewQMouseEventFromPointer(ev))
	} else {
		NewMocLabelFromPointer(ptr).MousePressEventDefault(std_gui.NewQMouseEventFromPointer(ev))
	}
}

func (ptr *MocLabel) MousePressEventDefault(ev std_gui.QMouseEvent_ITF) {
	qt.Debug("	MocLabel                                     MousePressEventDefault(ev std_gui.QMouseEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_MousePressEventDefault(ptr.Pointer(), std_gui.PointerFromQMouseEvent(ev))
	}
}

//export callbackMocLabel_MouseReleaseEvent
func callbackMocLabel_MouseReleaseEvent(ptr unsafe.Pointer, ev unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_MouseReleaseEvent(ptr unsafe.Pointer, ev unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "mouseReleaseEvent"); signal != nil {
		signal.(func(*std_gui.QMouseEvent))(std_gui.NewQMouseEventFromPointer(ev))
	} else {
		NewMocLabelFromPointer(ptr).MouseReleaseEventDefault(std_gui.NewQMouseEventFromPointer(ev))
	}
}

func (ptr *MocLabel) MouseReleaseEventDefault(ev std_gui.QMouseEvent_ITF) {
	qt.Debug("	MocLabel                                     MouseReleaseEventDefault(ev std_gui.QMouseEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_MouseReleaseEventDefault(ptr.Pointer(), std_gui.PointerFromQMouseEvent(ev))
	}
}

//export callbackMocLabel_PaintEvent
func callbackMocLabel_PaintEvent(ptr unsafe.Pointer, vqp unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_PaintEvent(ptr unsafe.Pointer, vqp unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "paintEvent"); signal != nil {
		signal.(func(*std_gui.QPaintEvent))(std_gui.NewQPaintEventFromPointer(vqp))
	} else {
		NewMocLabelFromPointer(ptr).PaintEventDefault(std_gui.NewQPaintEventFromPointer(vqp))
	}
}

func (ptr *MocLabel) PaintEventDefault(vqp std_gui.QPaintEvent_ITF) {
	qt.Debug("	MocLabel                                     PaintEventDefault(vqp std_gui.QPaintEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_PaintEventDefault(ptr.Pointer(), std_gui.PointerFromQPaintEvent(vqp))
	}
}

//export callbackMocLabel_SetMovie
func callbackMocLabel_SetMovie(ptr unsafe.Pointer, movie unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_SetMovie(ptr unsafe.Pointer, movie unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "setMovie"); signal != nil {
		signal.(func(*std_gui.QMovie))(std_gui.NewQMovieFromPointer(movie))
	} else {
		NewMocLabelFromPointer(ptr).SetMovieDefault(std_gui.NewQMovieFromPointer(movie))
	}
}

func (ptr *MocLabel) SetMovieDefault(movie std_gui.QMovie_ITF) {
	qt.Debug("	MocLabel                                     SetMovieDefault(movie std_gui.QMovie_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_SetMovieDefault(ptr.Pointer(), std_gui.PointerFromQMovie(movie))
	}
}

//export callbackMocLabel_SetNum2
func callbackMocLabel_SetNum2(ptr unsafe.Pointer, num C.double) {
	qt.Debug("	MocLabel                                     callbackMocLabel_SetNum2(ptr unsafe.Pointer, num C.double) ")
	if signal := qt.GetSignal(ptr, "setNum2"); signal != nil {
		signal.(func(float64))(float64(num))
	} else {
		NewMocLabelFromPointer(ptr).SetNum2Default(float64(num))
	}
}

func (ptr *MocLabel) SetNum2Default(num float64) {
	qt.Debug("	MocLabel                                     SetNum2Default(num float64) ")
	if ptr.Pointer() != nil {
		C.MocLabel_SetNum2Default(ptr.Pointer(), C.double(num))
	}
}

//export callbackMocLabel_SetNum
func callbackMocLabel_SetNum(ptr unsafe.Pointer, num C.int) {
	qt.Debug("	MocLabel                                     callbackMocLabel_SetNum(ptr unsafe.Pointer, num C.int) ")
	if signal := qt.GetSignal(ptr, "setNum"); signal != nil {
		signal.(func(int))(int(int32(num)))
	} else {
		NewMocLabelFromPointer(ptr).SetNumDefault(int(int32(num)))
	}
}

func (ptr *MocLabel) SetNumDefault(num int) {
	qt.Debug("	MocLabel                                     SetNumDefault(num int) ")
	if ptr.Pointer() != nil {
		C.MocLabel_SetNumDefault(ptr.Pointer(), C.int(int32(num)))
	}
}

//export callbackMocLabel_SetPicture
func callbackMocLabel_SetPicture(ptr unsafe.Pointer, picture unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_SetPicture(ptr unsafe.Pointer, picture unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "setPicture"); signal != nil {
		signal.(func(*std_gui.QPicture))(std_gui.NewQPictureFromPointer(picture))
	} else {
		NewMocLabelFromPointer(ptr).SetPictureDefault(std_gui.NewQPictureFromPointer(picture))
	}
}

func (ptr *MocLabel) SetPictureDefault(picture std_gui.QPicture_ITF) {
	qt.Debug("	MocLabel                                     SetPictureDefault(picture std_gui.QPicture_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_SetPictureDefault(ptr.Pointer(), std_gui.PointerFromQPicture(picture))
	}
}

//export callbackMocLabel_SetPixmap
func callbackMocLabel_SetPixmap(ptr unsafe.Pointer, vqp unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_SetPixmap(ptr unsafe.Pointer, vqp unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "setPixmap"); signal != nil {
		signal.(func(*std_gui.QPixmap))(std_gui.NewQPixmapFromPointer(vqp))
	} else {
		NewMocLabelFromPointer(ptr).SetPixmapDefault(std_gui.NewQPixmapFromPointer(vqp))
	}
}

func (ptr *MocLabel) SetPixmapDefault(vqp std_gui.QPixmap_ITF) {
	qt.Debug("	MocLabel                                     SetPixmapDefault(vqp std_gui.QPixmap_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_SetPixmapDefault(ptr.Pointer(), std_gui.PointerFromQPixmap(vqp))
	}
}

//export callbackMocLabel_SetText
func callbackMocLabel_SetText(ptr unsafe.Pointer, vqs C.struct_Moc_PackedString) {
	qt.Debug("	MocLabel                                     callbackMocLabel_SetText(ptr unsafe.Pointer, vqs C.struct_Moc_PackedString) ")
	if signal := qt.GetSignal(ptr, "setText"); signal != nil {
		signal.(func(string))(cGoUnpackString(vqs))
	} else {
		NewMocLabelFromPointer(ptr).SetTextDefault(cGoUnpackString(vqs))
	}
}

func (ptr *MocLabel) SetTextDefault(vqs string) {
	qt.Debug("	MocLabel                                     SetTextDefault(vqs string) ")
	if ptr.Pointer() != nil {
		var vqsC *C.char
		if vqs != "" {
			vqsC = C.CString(vqs)
			defer C.free(unsafe.Pointer(vqsC))
		}
		C.MocLabel_SetTextDefault(ptr.Pointer(), C.struct_Moc_PackedString{data: vqsC, len: C.longlong(len(vqs))})
	}
}

//export callbackMocLabel_MinimumSizeHint
func callbackMocLabel_MinimumSizeHint(ptr unsafe.Pointer) unsafe.Pointer {
	qt.Debug("	MocLabel                                     callbackMocLabel_MinimumSizeHint(ptr unsafe.Pointer) unsafe.Pointer")
	if signal := qt.GetSignal(ptr, "minimumSizeHint"); signal != nil {
		return std_core.PointerFromQSize(signal.(func() *std_core.QSize)())
	}

	return std_core.PointerFromQSize(NewMocLabelFromPointer(ptr).MinimumSizeHintDefault())
}

func (ptr *MocLabel) MinimumSizeHintDefault() *std_core.QSize {
	qt.Debug("	MocLabel                                     MinimumSizeHintDefault() *std_core.QSize")
	if ptr.Pointer() != nil {
		var tmpValue = std_core.NewQSizeFromPointer(C.MocLabel_MinimumSizeHintDefault(ptr.Pointer()))
		runtime.SetFinalizer(tmpValue, (*std_core.QSize).DestroyQSize)
		return tmpValue
	}
	return nil
}

//export callbackMocLabel_SizeHint
func callbackMocLabel_SizeHint(ptr unsafe.Pointer) unsafe.Pointer {
	qt.Debug("	MocLabel                                     callbackMocLabel_SizeHint(ptr unsafe.Pointer) unsafe.Pointer")
	if signal := qt.GetSignal(ptr, "sizeHint"); signal != nil {
		return std_core.PointerFromQSize(signal.(func() *std_core.QSize)())
	}

	return std_core.PointerFromQSize(NewMocLabelFromPointer(ptr).SizeHintDefault())
}

func (ptr *MocLabel) SizeHintDefault() *std_core.QSize {
	qt.Debug("	MocLabel                                     SizeHintDefault() *std_core.QSize")
	if ptr.Pointer() != nil {
		var tmpValue = std_core.NewQSizeFromPointer(C.MocLabel_SizeHintDefault(ptr.Pointer()))
		runtime.SetFinalizer(tmpValue, (*std_core.QSize).DestroyQSize)
		return tmpValue
	}
	return nil
}

//export callbackMocLabel_HeightForWidth
func callbackMocLabel_HeightForWidth(ptr unsafe.Pointer, w C.int) C.int {
	qt.Debug("	MocLabel                                     callbackMocLabel_HeightForWidth(ptr unsafe.Pointer, w C.int) C.int")
	if signal := qt.GetSignal(ptr, "heightForWidth"); signal != nil {
		return C.int(int32(signal.(func(int) int)(int(int32(w)))))
	}

	return C.int(int32(NewMocLabelFromPointer(ptr).HeightForWidthDefault(int(int32(w)))))
}

func (ptr *MocLabel) HeightForWidthDefault(w int) int {
	qt.Debug("	MocLabel                                     HeightForWidthDefault(w int) int")
	if ptr.Pointer() != nil {
		return int(int32(C.MocLabel_HeightForWidthDefault(ptr.Pointer(), C.int(int32(w)))))
	}
	return 0
}

//export callbackMocLabel_Close
func callbackMocLabel_Close(ptr unsafe.Pointer) C.char {
	qt.Debug("	MocLabel                                     callbackMocLabel_Close(ptr unsafe.Pointer) C.char")
	if signal := qt.GetSignal(ptr, "close"); signal != nil {
		return C.char(int8(qt.GoBoolToInt(signal.(func() bool)())))
	}

	return C.char(int8(qt.GoBoolToInt(NewMocLabelFromPointer(ptr).CloseDefault())))
}

func (ptr *MocLabel) CloseDefault() bool {
	qt.Debug("	MocLabel                                     CloseDefault() bool")
	if ptr.Pointer() != nil {
		return C.MocLabel_CloseDefault(ptr.Pointer()) != 0
	}
	return false
}

//export callbackMocLabel_NativeEvent
func callbackMocLabel_NativeEvent(ptr unsafe.Pointer, eventType unsafe.Pointer, message unsafe.Pointer, result C.long) C.char {
	qt.Debug("	MocLabel                                     callbackMocLabel_NativeEvent(ptr unsafe.Pointer, eventType unsafe.Pointer, message unsafe.Pointer, result C.long) C.char")
	if signal := qt.GetSignal(ptr, "nativeEvent"); signal != nil {
		return C.char(int8(qt.GoBoolToInt(signal.(func(*std_core.QByteArray, unsafe.Pointer, int) bool)(std_core.NewQByteArrayFromPointer(eventType), message, int(int32(result))))))
	}

	return C.char(int8(qt.GoBoolToInt(NewMocLabelFromPointer(ptr).NativeEventDefault(std_core.NewQByteArrayFromPointer(eventType), message, int(int32(result))))))
}

func (ptr *MocLabel) NativeEventDefault(eventType std_core.QByteArray_ITF, message unsafe.Pointer, result int) bool {
	qt.Debug("	MocLabel                                     NativeEventDefault(eventType std_core.QByteArray_ITF, message unsafe.Pointer, result int) bool")
	if ptr.Pointer() != nil {
		return C.MocLabel_NativeEventDefault(ptr.Pointer(), std_core.PointerFromQByteArray(eventType), message, C.long(int32(result))) != 0
	}
	return false
}

//export callbackMocLabel_ActionEvent
func callbackMocLabel_ActionEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_ActionEvent(ptr unsafe.Pointer, event unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "actionEvent"); signal != nil {
		signal.(func(*std_gui.QActionEvent))(std_gui.NewQActionEventFromPointer(event))
	} else {
		NewMocLabelFromPointer(ptr).ActionEventDefault(std_gui.NewQActionEventFromPointer(event))
	}
}

func (ptr *MocLabel) ActionEventDefault(event std_gui.QActionEvent_ITF) {
	qt.Debug("	MocLabel                                     ActionEventDefault(event std_gui.QActionEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_ActionEventDefault(ptr.Pointer(), std_gui.PointerFromQActionEvent(event))
	}
}

//export callbackMocLabel_CloseEvent
func callbackMocLabel_CloseEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_CloseEvent(ptr unsafe.Pointer, event unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "closeEvent"); signal != nil {
		signal.(func(*std_gui.QCloseEvent))(std_gui.NewQCloseEventFromPointer(event))
	} else {
		NewMocLabelFromPointer(ptr).CloseEventDefault(std_gui.NewQCloseEventFromPointer(event))
	}
}

func (ptr *MocLabel) CloseEventDefault(event std_gui.QCloseEvent_ITF) {
	qt.Debug("	MocLabel                                     CloseEventDefault(event std_gui.QCloseEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_CloseEventDefault(ptr.Pointer(), std_gui.PointerFromQCloseEvent(event))
	}
}

//export callbackMocLabel_CustomContextMenuRequested
func callbackMocLabel_CustomContextMenuRequested(ptr unsafe.Pointer, pos unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_CustomContextMenuRequested(ptr unsafe.Pointer, pos unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "customContextMenuRequested"); signal != nil {
		signal.(func(*std_core.QPoint))(std_core.NewQPointFromPointer(pos))
	}

}

//export callbackMocLabel_DragEnterEvent
func callbackMocLabel_DragEnterEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_DragEnterEvent(ptr unsafe.Pointer, event unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "dragEnterEvent"); signal != nil {
		signal.(func(*std_gui.QDragEnterEvent))(std_gui.NewQDragEnterEventFromPointer(event))
	} else {
		NewMocLabelFromPointer(ptr).DragEnterEventDefault(std_gui.NewQDragEnterEventFromPointer(event))
	}
}

func (ptr *MocLabel) DragEnterEventDefault(event std_gui.QDragEnterEvent_ITF) {
	qt.Debug("	MocLabel                                     DragEnterEventDefault(event std_gui.QDragEnterEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_DragEnterEventDefault(ptr.Pointer(), std_gui.PointerFromQDragEnterEvent(event))
	}
}

//export callbackMocLabel_DragLeaveEvent
func callbackMocLabel_DragLeaveEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_DragLeaveEvent(ptr unsafe.Pointer, event unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "dragLeaveEvent"); signal != nil {
		signal.(func(*std_gui.QDragLeaveEvent))(std_gui.NewQDragLeaveEventFromPointer(event))
	} else {
		NewMocLabelFromPointer(ptr).DragLeaveEventDefault(std_gui.NewQDragLeaveEventFromPointer(event))
	}
}

func (ptr *MocLabel) DragLeaveEventDefault(event std_gui.QDragLeaveEvent_ITF) {
	qt.Debug("	MocLabel                                     DragLeaveEventDefault(event std_gui.QDragLeaveEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_DragLeaveEventDefault(ptr.Pointer(), std_gui.PointerFromQDragLeaveEvent(event))
	}
}

//export callbackMocLabel_DragMoveEvent
func callbackMocLabel_DragMoveEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_DragMoveEvent(ptr unsafe.Pointer, event unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "dragMoveEvent"); signal != nil {
		signal.(func(*std_gui.QDragMoveEvent))(std_gui.NewQDragMoveEventFromPointer(event))
	} else {
		NewMocLabelFromPointer(ptr).DragMoveEventDefault(std_gui.NewQDragMoveEventFromPointer(event))
	}
}

func (ptr *MocLabel) DragMoveEventDefault(event std_gui.QDragMoveEvent_ITF) {
	qt.Debug("	MocLabel                                     DragMoveEventDefault(event std_gui.QDragMoveEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_DragMoveEventDefault(ptr.Pointer(), std_gui.PointerFromQDragMoveEvent(event))
	}
}

//export callbackMocLabel_DropEvent
func callbackMocLabel_DropEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_DropEvent(ptr unsafe.Pointer, event unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "dropEvent"); signal != nil {
		signal.(func(*std_gui.QDropEvent))(std_gui.NewQDropEventFromPointer(event))
	} else {
		NewMocLabelFromPointer(ptr).DropEventDefault(std_gui.NewQDropEventFromPointer(event))
	}
}

func (ptr *MocLabel) DropEventDefault(event std_gui.QDropEvent_ITF) {
	qt.Debug("	MocLabel                                     DropEventDefault(event std_gui.QDropEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_DropEventDefault(ptr.Pointer(), std_gui.PointerFromQDropEvent(event))
	}
}

//export callbackMocLabel_EnterEvent
func callbackMocLabel_EnterEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_EnterEvent(ptr unsafe.Pointer, event unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "enterEvent"); signal != nil {
		signal.(func(*std_core.QEvent))(std_core.NewQEventFromPointer(event))
	} else {
		NewMocLabelFromPointer(ptr).EnterEventDefault(std_core.NewQEventFromPointer(event))
	}
}

func (ptr *MocLabel) EnterEventDefault(event std_core.QEvent_ITF) {
	qt.Debug("	MocLabel                                     EnterEventDefault(event std_core.QEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_EnterEventDefault(ptr.Pointer(), std_core.PointerFromQEvent(event))
	}
}

//export callbackMocLabel_Hide
func callbackMocLabel_Hide(ptr unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_Hide(ptr unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "hide"); signal != nil {
		signal.(func())()
	} else {
		NewMocLabelFromPointer(ptr).HideDefault()
	}
}

func (ptr *MocLabel) HideDefault() {
	qt.Debug("	MocLabel                                     HideDefault() ")
	if ptr.Pointer() != nil {
		C.MocLabel_HideDefault(ptr.Pointer())
	}
}

//export callbackMocLabel_HideEvent
func callbackMocLabel_HideEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_HideEvent(ptr unsafe.Pointer, event unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "hideEvent"); signal != nil {
		signal.(func(*std_gui.QHideEvent))(std_gui.NewQHideEventFromPointer(event))
	} else {
		NewMocLabelFromPointer(ptr).HideEventDefault(std_gui.NewQHideEventFromPointer(event))
	}
}

func (ptr *MocLabel) HideEventDefault(event std_gui.QHideEvent_ITF) {
	qt.Debug("	MocLabel                                     HideEventDefault(event std_gui.QHideEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_HideEventDefault(ptr.Pointer(), std_gui.PointerFromQHideEvent(event))
	}
}

//export callbackMocLabel_InputMethodEvent
func callbackMocLabel_InputMethodEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_InputMethodEvent(ptr unsafe.Pointer, event unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "inputMethodEvent"); signal != nil {
		signal.(func(*std_gui.QInputMethodEvent))(std_gui.NewQInputMethodEventFromPointer(event))
	} else {
		NewMocLabelFromPointer(ptr).InputMethodEventDefault(std_gui.NewQInputMethodEventFromPointer(event))
	}
}

func (ptr *MocLabel) InputMethodEventDefault(event std_gui.QInputMethodEvent_ITF) {
	qt.Debug("	MocLabel                                     InputMethodEventDefault(event std_gui.QInputMethodEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_InputMethodEventDefault(ptr.Pointer(), std_gui.PointerFromQInputMethodEvent(event))
	}
}

//export callbackMocLabel_KeyReleaseEvent
func callbackMocLabel_KeyReleaseEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_KeyReleaseEvent(ptr unsafe.Pointer, event unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "keyReleaseEvent"); signal != nil {
		signal.(func(*std_gui.QKeyEvent))(std_gui.NewQKeyEventFromPointer(event))
	} else {
		NewMocLabelFromPointer(ptr).KeyReleaseEventDefault(std_gui.NewQKeyEventFromPointer(event))
	}
}

func (ptr *MocLabel) KeyReleaseEventDefault(event std_gui.QKeyEvent_ITF) {
	qt.Debug("	MocLabel                                     KeyReleaseEventDefault(event std_gui.QKeyEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_KeyReleaseEventDefault(ptr.Pointer(), std_gui.PointerFromQKeyEvent(event))
	}
}

//export callbackMocLabel_LeaveEvent
func callbackMocLabel_LeaveEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_LeaveEvent(ptr unsafe.Pointer, event unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "leaveEvent"); signal != nil {
		signal.(func(*std_core.QEvent))(std_core.NewQEventFromPointer(event))
	} else {
		NewMocLabelFromPointer(ptr).LeaveEventDefault(std_core.NewQEventFromPointer(event))
	}
}

func (ptr *MocLabel) LeaveEventDefault(event std_core.QEvent_ITF) {
	qt.Debug("	MocLabel                                     LeaveEventDefault(event std_core.QEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_LeaveEventDefault(ptr.Pointer(), std_core.PointerFromQEvent(event))
	}
}

//export callbackMocLabel_Lower
func callbackMocLabel_Lower(ptr unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_Lower(ptr unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "lower"); signal != nil {
		signal.(func())()
	} else {
		NewMocLabelFromPointer(ptr).LowerDefault()
	}
}

func (ptr *MocLabel) LowerDefault() {
	qt.Debug("	MocLabel                                     LowerDefault() ")
	if ptr.Pointer() != nil {
		C.MocLabel_LowerDefault(ptr.Pointer())
	}
}

//export callbackMocLabel_MouseDoubleClickEvent
func callbackMocLabel_MouseDoubleClickEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_MouseDoubleClickEvent(ptr unsafe.Pointer, event unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "mouseDoubleClickEvent"); signal != nil {
		signal.(func(*std_gui.QMouseEvent))(std_gui.NewQMouseEventFromPointer(event))
	} else {
		NewMocLabelFromPointer(ptr).MouseDoubleClickEventDefault(std_gui.NewQMouseEventFromPointer(event))
	}
}

func (ptr *MocLabel) MouseDoubleClickEventDefault(event std_gui.QMouseEvent_ITF) {
	qt.Debug("	MocLabel                                     MouseDoubleClickEventDefault(event std_gui.QMouseEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_MouseDoubleClickEventDefault(ptr.Pointer(), std_gui.PointerFromQMouseEvent(event))
	}
}

//export callbackMocLabel_MoveEvent
func callbackMocLabel_MoveEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_MoveEvent(ptr unsafe.Pointer, event unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "moveEvent"); signal != nil {
		signal.(func(*std_gui.QMoveEvent))(std_gui.NewQMoveEventFromPointer(event))
	} else {
		NewMocLabelFromPointer(ptr).MoveEventDefault(std_gui.NewQMoveEventFromPointer(event))
	}
}

func (ptr *MocLabel) MoveEventDefault(event std_gui.QMoveEvent_ITF) {
	qt.Debug("	MocLabel                                     MoveEventDefault(event std_gui.QMoveEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_MoveEventDefault(ptr.Pointer(), std_gui.PointerFromQMoveEvent(event))
	}
}

//export callbackMocLabel_Raise
func callbackMocLabel_Raise(ptr unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_Raise(ptr unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "raise"); signal != nil {
		signal.(func())()
	} else {
		NewMocLabelFromPointer(ptr).RaiseDefault()
	}
}

func (ptr *MocLabel) RaiseDefault() {
	qt.Debug("	MocLabel                                     RaiseDefault() ")
	if ptr.Pointer() != nil {
		C.MocLabel_RaiseDefault(ptr.Pointer())
	}
}

//export callbackMocLabel_Repaint
func callbackMocLabel_Repaint(ptr unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_Repaint(ptr unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "repaint"); signal != nil {
		signal.(func())()
	} else {
		NewMocLabelFromPointer(ptr).RepaintDefault()
	}
}

func (ptr *MocLabel) RepaintDefault() {
	qt.Debug("	MocLabel                                     RepaintDefault() ")
	if ptr.Pointer() != nil {
		C.MocLabel_RepaintDefault(ptr.Pointer())
	}
}

//export callbackMocLabel_ResizeEvent
func callbackMocLabel_ResizeEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_ResizeEvent(ptr unsafe.Pointer, event unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "resizeEvent"); signal != nil {
		signal.(func(*std_gui.QResizeEvent))(std_gui.NewQResizeEventFromPointer(event))
	} else {
		NewMocLabelFromPointer(ptr).ResizeEventDefault(std_gui.NewQResizeEventFromPointer(event))
	}
}

func (ptr *MocLabel) ResizeEventDefault(event std_gui.QResizeEvent_ITF) {
	qt.Debug("	MocLabel                                     ResizeEventDefault(event std_gui.QResizeEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_ResizeEventDefault(ptr.Pointer(), std_gui.PointerFromQResizeEvent(event))
	}
}

//export callbackMocLabel_SetDisabled
func callbackMocLabel_SetDisabled(ptr unsafe.Pointer, disable C.char) {
	qt.Debug("	MocLabel                                     callbackMocLabel_SetDisabled(ptr unsafe.Pointer, disable C.char) ")
	if signal := qt.GetSignal(ptr, "setDisabled"); signal != nil {
		signal.(func(bool))(int8(disable) != 0)
	} else {
		NewMocLabelFromPointer(ptr).SetDisabledDefault(int8(disable) != 0)
	}
}

func (ptr *MocLabel) SetDisabledDefault(disable bool) {
	qt.Debug("	MocLabel                                     SetDisabledDefault(disable bool) ")
	if ptr.Pointer() != nil {
		C.MocLabel_SetDisabledDefault(ptr.Pointer(), C.char(int8(qt.GoBoolToInt(disable))))
	}
}

//export callbackMocLabel_SetEnabled
func callbackMocLabel_SetEnabled(ptr unsafe.Pointer, vbo C.char) {
	qt.Debug("	MocLabel                                     callbackMocLabel_SetEnabled(ptr unsafe.Pointer, vbo C.char) ")
	if signal := qt.GetSignal(ptr, "setEnabled"); signal != nil {
		signal.(func(bool))(int8(vbo) != 0)
	} else {
		NewMocLabelFromPointer(ptr).SetEnabledDefault(int8(vbo) != 0)
	}
}

func (ptr *MocLabel) SetEnabledDefault(vbo bool) {
	qt.Debug("	MocLabel                                     SetEnabledDefault(vbo bool) ")
	if ptr.Pointer() != nil {
		C.MocLabel_SetEnabledDefault(ptr.Pointer(), C.char(int8(qt.GoBoolToInt(vbo))))
	}
}

//export callbackMocLabel_SetFocus2
func callbackMocLabel_SetFocus2(ptr unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_SetFocus2(ptr unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "setFocus2"); signal != nil {
		signal.(func())()
	} else {
		NewMocLabelFromPointer(ptr).SetFocus2Default()
	}
}

func (ptr *MocLabel) SetFocus2Default() {
	qt.Debug("	MocLabel                                     SetFocus2Default() ")
	if ptr.Pointer() != nil {
		C.MocLabel_SetFocus2Default(ptr.Pointer())
	}
}

//export callbackMocLabel_SetHidden
func callbackMocLabel_SetHidden(ptr unsafe.Pointer, hidden C.char) {
	qt.Debug("	MocLabel                                     callbackMocLabel_SetHidden(ptr unsafe.Pointer, hidden C.char) ")
	if signal := qt.GetSignal(ptr, "setHidden"); signal != nil {
		signal.(func(bool))(int8(hidden) != 0)
	} else {
		NewMocLabelFromPointer(ptr).SetHiddenDefault(int8(hidden) != 0)
	}
}

func (ptr *MocLabel) SetHiddenDefault(hidden bool) {
	qt.Debug("	MocLabel                                     SetHiddenDefault(hidden bool) ")
	if ptr.Pointer() != nil {
		C.MocLabel_SetHiddenDefault(ptr.Pointer(), C.char(int8(qt.GoBoolToInt(hidden))))
	}
}

//export callbackMocLabel_SetStyleSheet
func callbackMocLabel_SetStyleSheet(ptr unsafe.Pointer, styleSheet C.struct_Moc_PackedString) {
	qt.Debug("	MocLabel                                     callbackMocLabel_SetStyleSheet(ptr unsafe.Pointer, styleSheet C.struct_Moc_PackedString) ")
	if signal := qt.GetSignal(ptr, "setStyleSheet"); signal != nil {
		signal.(func(string))(cGoUnpackString(styleSheet))
	} else {
		NewMocLabelFromPointer(ptr).SetStyleSheetDefault(cGoUnpackString(styleSheet))
	}
}

func (ptr *MocLabel) SetStyleSheetDefault(styleSheet string) {
	qt.Debug("	MocLabel                                     SetStyleSheetDefault(styleSheet string) ")
	if ptr.Pointer() != nil {
		var styleSheetC *C.char
		if styleSheet != "" {
			styleSheetC = C.CString(styleSheet)
			defer C.free(unsafe.Pointer(styleSheetC))
		}
		C.MocLabel_SetStyleSheetDefault(ptr.Pointer(), C.struct_Moc_PackedString{data: styleSheetC, len: C.longlong(len(styleSheet))})
	}
}

//export callbackMocLabel_SetVisible
func callbackMocLabel_SetVisible(ptr unsafe.Pointer, visible C.char) {
	qt.Debug("	MocLabel                                     callbackMocLabel_SetVisible(ptr unsafe.Pointer, visible C.char) ")
	if signal := qt.GetSignal(ptr, "setVisible"); signal != nil {
		signal.(func(bool))(int8(visible) != 0)
	} else {
		NewMocLabelFromPointer(ptr).SetVisibleDefault(int8(visible) != 0)
	}
}

func (ptr *MocLabel) SetVisibleDefault(visible bool) {
	qt.Debug("	MocLabel                                     SetVisibleDefault(visible bool) ")
	if ptr.Pointer() != nil {
		C.MocLabel_SetVisibleDefault(ptr.Pointer(), C.char(int8(qt.GoBoolToInt(visible))))
	}
}

//export callbackMocLabel_SetWindowModified
func callbackMocLabel_SetWindowModified(ptr unsafe.Pointer, vbo C.char) {
	qt.Debug("	MocLabel                                     callbackMocLabel_SetWindowModified(ptr unsafe.Pointer, vbo C.char) ")
	if signal := qt.GetSignal(ptr, "setWindowModified"); signal != nil {
		signal.(func(bool))(int8(vbo) != 0)
	} else {
		NewMocLabelFromPointer(ptr).SetWindowModifiedDefault(int8(vbo) != 0)
	}
}

func (ptr *MocLabel) SetWindowModifiedDefault(vbo bool) {
	qt.Debug("	MocLabel                                     SetWindowModifiedDefault(vbo bool) ")
	if ptr.Pointer() != nil {
		C.MocLabel_SetWindowModifiedDefault(ptr.Pointer(), C.char(int8(qt.GoBoolToInt(vbo))))
	}
}

//export callbackMocLabel_SetWindowTitle
func callbackMocLabel_SetWindowTitle(ptr unsafe.Pointer, vqs C.struct_Moc_PackedString) {
	qt.Debug("	MocLabel                                     callbackMocLabel_SetWindowTitle(ptr unsafe.Pointer, vqs C.struct_Moc_PackedString) ")
	if signal := qt.GetSignal(ptr, "setWindowTitle"); signal != nil {
		signal.(func(string))(cGoUnpackString(vqs))
	} else {
		NewMocLabelFromPointer(ptr).SetWindowTitleDefault(cGoUnpackString(vqs))
	}
}

func (ptr *MocLabel) SetWindowTitleDefault(vqs string) {
	qt.Debug("	MocLabel                                     SetWindowTitleDefault(vqs string) ")
	if ptr.Pointer() != nil {
		var vqsC *C.char
		if vqs != "" {
			vqsC = C.CString(vqs)
			defer C.free(unsafe.Pointer(vqsC))
		}
		C.MocLabel_SetWindowTitleDefault(ptr.Pointer(), C.struct_Moc_PackedString{data: vqsC, len: C.longlong(len(vqs))})
	}
}

//export callbackMocLabel_Show
func callbackMocLabel_Show(ptr unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_Show(ptr unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "show"); signal != nil {
		signal.(func())()
	} else {
		NewMocLabelFromPointer(ptr).ShowDefault()
	}
}

func (ptr *MocLabel) ShowDefault() {
	qt.Debug("	MocLabel                                     ShowDefault() ")
	if ptr.Pointer() != nil {
		C.MocLabel_ShowDefault(ptr.Pointer())
	}
}

//export callbackMocLabel_ShowEvent
func callbackMocLabel_ShowEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_ShowEvent(ptr unsafe.Pointer, event unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "showEvent"); signal != nil {
		signal.(func(*std_gui.QShowEvent))(std_gui.NewQShowEventFromPointer(event))
	} else {
		NewMocLabelFromPointer(ptr).ShowEventDefault(std_gui.NewQShowEventFromPointer(event))
	}
}

func (ptr *MocLabel) ShowEventDefault(event std_gui.QShowEvent_ITF) {
	qt.Debug("	MocLabel                                     ShowEventDefault(event std_gui.QShowEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_ShowEventDefault(ptr.Pointer(), std_gui.PointerFromQShowEvent(event))
	}
}

//export callbackMocLabel_ShowFullScreen
func callbackMocLabel_ShowFullScreen(ptr unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_ShowFullScreen(ptr unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "showFullScreen"); signal != nil {
		signal.(func())()
	} else {
		NewMocLabelFromPointer(ptr).ShowFullScreenDefault()
	}
}

func (ptr *MocLabel) ShowFullScreenDefault() {
	qt.Debug("	MocLabel                                     ShowFullScreenDefault() ")
	if ptr.Pointer() != nil {
		C.MocLabel_ShowFullScreenDefault(ptr.Pointer())
	}
}

//export callbackMocLabel_ShowMaximized
func callbackMocLabel_ShowMaximized(ptr unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_ShowMaximized(ptr unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "showMaximized"); signal != nil {
		signal.(func())()
	} else {
		NewMocLabelFromPointer(ptr).ShowMaximizedDefault()
	}
}

func (ptr *MocLabel) ShowMaximizedDefault() {
	qt.Debug("	MocLabel                                     ShowMaximizedDefault() ")
	if ptr.Pointer() != nil {
		C.MocLabel_ShowMaximizedDefault(ptr.Pointer())
	}
}

//export callbackMocLabel_ShowMinimized
func callbackMocLabel_ShowMinimized(ptr unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_ShowMinimized(ptr unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "showMinimized"); signal != nil {
		signal.(func())()
	} else {
		NewMocLabelFromPointer(ptr).ShowMinimizedDefault()
	}
}

func (ptr *MocLabel) ShowMinimizedDefault() {
	qt.Debug("	MocLabel                                     ShowMinimizedDefault() ")
	if ptr.Pointer() != nil {
		C.MocLabel_ShowMinimizedDefault(ptr.Pointer())
	}
}

//export callbackMocLabel_ShowNormal
func callbackMocLabel_ShowNormal(ptr unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_ShowNormal(ptr unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "showNormal"); signal != nil {
		signal.(func())()
	} else {
		NewMocLabelFromPointer(ptr).ShowNormalDefault()
	}
}

func (ptr *MocLabel) ShowNormalDefault() {
	qt.Debug("	MocLabel                                     ShowNormalDefault() ")
	if ptr.Pointer() != nil {
		C.MocLabel_ShowNormalDefault(ptr.Pointer())
	}
}

//export callbackMocLabel_TabletEvent
func callbackMocLabel_TabletEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_TabletEvent(ptr unsafe.Pointer, event unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "tabletEvent"); signal != nil {
		signal.(func(*std_gui.QTabletEvent))(std_gui.NewQTabletEventFromPointer(event))
	} else {
		NewMocLabelFromPointer(ptr).TabletEventDefault(std_gui.NewQTabletEventFromPointer(event))
	}
}

func (ptr *MocLabel) TabletEventDefault(event std_gui.QTabletEvent_ITF) {
	qt.Debug("	MocLabel                                     TabletEventDefault(event std_gui.QTabletEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_TabletEventDefault(ptr.Pointer(), std_gui.PointerFromQTabletEvent(event))
	}
}

//export callbackMocLabel_Update
func callbackMocLabel_Update(ptr unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_Update(ptr unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "update"); signal != nil {
		signal.(func())()
	} else {
		NewMocLabelFromPointer(ptr).UpdateDefault()
	}
}

func (ptr *MocLabel) UpdateDefault() {
	qt.Debug("	MocLabel                                     UpdateDefault() ")
	if ptr.Pointer() != nil {
		C.MocLabel_UpdateDefault(ptr.Pointer())
	}
}

//export callbackMocLabel_UpdateMicroFocus
func callbackMocLabel_UpdateMicroFocus(ptr unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_UpdateMicroFocus(ptr unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "updateMicroFocus"); signal != nil {
		signal.(func())()
	} else {
		NewMocLabelFromPointer(ptr).UpdateMicroFocusDefault()
	}
}

func (ptr *MocLabel) UpdateMicroFocusDefault() {
	qt.Debug("	MocLabel                                     UpdateMicroFocusDefault() ")
	if ptr.Pointer() != nil {
		C.MocLabel_UpdateMicroFocusDefault(ptr.Pointer())
	}
}

//export callbackMocLabel_WheelEvent
func callbackMocLabel_WheelEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_WheelEvent(ptr unsafe.Pointer, event unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "wheelEvent"); signal != nil {
		signal.(func(*std_gui.QWheelEvent))(std_gui.NewQWheelEventFromPointer(event))
	} else {
		NewMocLabelFromPointer(ptr).WheelEventDefault(std_gui.NewQWheelEventFromPointer(event))
	}
}

func (ptr *MocLabel) WheelEventDefault(event std_gui.QWheelEvent_ITF) {
	qt.Debug("	MocLabel                                     WheelEventDefault(event std_gui.QWheelEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_WheelEventDefault(ptr.Pointer(), std_gui.PointerFromQWheelEvent(event))
	}
}

//export callbackMocLabel_WindowIconChanged
func callbackMocLabel_WindowIconChanged(ptr unsafe.Pointer, icon unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_WindowIconChanged(ptr unsafe.Pointer, icon unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "windowIconChanged"); signal != nil {
		signal.(func(*std_gui.QIcon))(std_gui.NewQIconFromPointer(icon))
	}

}

//export callbackMocLabel_WindowTitleChanged
func callbackMocLabel_WindowTitleChanged(ptr unsafe.Pointer, title C.struct_Moc_PackedString) {
	qt.Debug("	MocLabel                                     callbackMocLabel_WindowTitleChanged(ptr unsafe.Pointer, title C.struct_Moc_PackedString) ")
	if signal := qt.GetSignal(ptr, "windowTitleChanged"); signal != nil {
		signal.(func(string))(cGoUnpackString(title))
	}

}

//export callbackMocLabel_PaintEngine
func callbackMocLabel_PaintEngine(ptr unsafe.Pointer) unsafe.Pointer {
	qt.Debug("	MocLabel                                     callbackMocLabel_PaintEngine(ptr unsafe.Pointer) unsafe.Pointer")
	if signal := qt.GetSignal(ptr, "paintEngine"); signal != nil {
		return std_gui.PointerFromQPaintEngine(signal.(func() *std_gui.QPaintEngine)())
	}

	return std_gui.PointerFromQPaintEngine(NewMocLabelFromPointer(ptr).PaintEngineDefault())
}

func (ptr *MocLabel) PaintEngineDefault() *std_gui.QPaintEngine {
	qt.Debug("	MocLabel                                     PaintEngineDefault() *std_gui.QPaintEngine")
	if ptr.Pointer() != nil {
		return std_gui.NewQPaintEngineFromPointer(C.MocLabel_PaintEngineDefault(ptr.Pointer()))
	}
	return nil
}

//export callbackMocLabel_InputMethodQuery
func callbackMocLabel_InputMethodQuery(ptr unsafe.Pointer, query C.longlong) unsafe.Pointer {
	qt.Debug("	MocLabel                                     callbackMocLabel_InputMethodQuery(ptr unsafe.Pointer, query C.longlong) unsafe.Pointer")
	if signal := qt.GetSignal(ptr, "inputMethodQuery"); signal != nil {
		return std_core.PointerFromQVariant(signal.(func(std_core.Qt__InputMethodQuery) *std_core.QVariant)(std_core.Qt__InputMethodQuery(query)))
	}

	return std_core.PointerFromQVariant(NewMocLabelFromPointer(ptr).InputMethodQueryDefault(std_core.Qt__InputMethodQuery(query)))
}

func (ptr *MocLabel) InputMethodQueryDefault(query std_core.Qt__InputMethodQuery) *std_core.QVariant {
	qt.Debug("	MocLabel                                     InputMethodQueryDefault(query std_core.Qt__InputMethodQuery) *std_core.QVariant")
	if ptr.Pointer() != nil {
		var tmpValue = std_core.NewQVariantFromPointer(C.MocLabel_InputMethodQueryDefault(ptr.Pointer(), C.longlong(query)))
		runtime.SetFinalizer(tmpValue, (*std_core.QVariant).DestroyQVariant)
		return tmpValue
	}
	return nil
}

//export callbackMocLabel_HasHeightForWidth
func callbackMocLabel_HasHeightForWidth(ptr unsafe.Pointer) C.char {
	qt.Debug("	MocLabel                                     callbackMocLabel_HasHeightForWidth(ptr unsafe.Pointer) C.char")
	if signal := qt.GetSignal(ptr, "hasHeightForWidth"); signal != nil {
		return C.char(int8(qt.GoBoolToInt(signal.(func() bool)())))
	}

	return C.char(int8(qt.GoBoolToInt(NewMocLabelFromPointer(ptr).HasHeightForWidthDefault())))
}

func (ptr *MocLabel) HasHeightForWidthDefault() bool {
	qt.Debug("	MocLabel                                     HasHeightForWidthDefault() bool")
	if ptr.Pointer() != nil {
		return C.MocLabel_HasHeightForWidthDefault(ptr.Pointer()) != 0
	}
	return false
}

//export callbackMocLabel_Metric
func callbackMocLabel_Metric(ptr unsafe.Pointer, m C.longlong) C.int {
	qt.Debug("	MocLabel                                     callbackMocLabel_Metric(ptr unsafe.Pointer, m C.longlong) C.int")
	if signal := qt.GetSignal(ptr, "metric"); signal != nil {
		return C.int(int32(signal.(func(std_gui.QPaintDevice__PaintDeviceMetric) int)(std_gui.QPaintDevice__PaintDeviceMetric(m))))
	}

	return C.int(int32(NewMocLabelFromPointer(ptr).MetricDefault(std_gui.QPaintDevice__PaintDeviceMetric(m))))
}

func (ptr *MocLabel) MetricDefault(m std_gui.QPaintDevice__PaintDeviceMetric) int {
	qt.Debug("	MocLabel                                     MetricDefault(m std_gui.QPaintDevice__PaintDeviceMetric) int")
	if ptr.Pointer() != nil {
		return int(int32(C.MocLabel_MetricDefault(ptr.Pointer(), C.longlong(m))))
	}
	return 0
}

//export callbackMocLabel_EventFilter
func callbackMocLabel_EventFilter(ptr unsafe.Pointer, watched unsafe.Pointer, event unsafe.Pointer) C.char {
	qt.Debug("	MocLabel                                     callbackMocLabel_EventFilter(ptr unsafe.Pointer, watched unsafe.Pointer, event unsafe.Pointer) C.char")
	if signal := qt.GetSignal(ptr, "eventFilter"); signal != nil {
		return C.char(int8(qt.GoBoolToInt(signal.(func(*std_core.QObject, *std_core.QEvent) bool)(std_core.NewQObjectFromPointer(watched), std_core.NewQEventFromPointer(event)))))
	}

	return C.char(int8(qt.GoBoolToInt(NewMocLabelFromPointer(ptr).EventFilterDefault(std_core.NewQObjectFromPointer(watched), std_core.NewQEventFromPointer(event)))))
}

func (ptr *MocLabel) EventFilterDefault(watched std_core.QObject_ITF, event std_core.QEvent_ITF) bool {
	qt.Debug("	MocLabel                                     EventFilterDefault(watched std_core.QObject_ITF, event std_core.QEvent_ITF) bool")
	if ptr.Pointer() != nil {
		return C.MocLabel_EventFilterDefault(ptr.Pointer(), std_core.PointerFromQObject(watched), std_core.PointerFromQEvent(event)) != 0
	}
	return false
}

//export callbackMocLabel_ChildEvent
func callbackMocLabel_ChildEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_ChildEvent(ptr unsafe.Pointer, event unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "childEvent"); signal != nil {
		signal.(func(*std_core.QChildEvent))(std_core.NewQChildEventFromPointer(event))
	} else {
		NewMocLabelFromPointer(ptr).ChildEventDefault(std_core.NewQChildEventFromPointer(event))
	}
}

func (ptr *MocLabel) ChildEventDefault(event std_core.QChildEvent_ITF) {
	qt.Debug("	MocLabel                                     ChildEventDefault(event std_core.QChildEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_ChildEventDefault(ptr.Pointer(), std_core.PointerFromQChildEvent(event))
	}
}

//export callbackMocLabel_ConnectNotify
func callbackMocLabel_ConnectNotify(ptr unsafe.Pointer, sign unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_ConnectNotify(ptr unsafe.Pointer, sign unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "connectNotify"); signal != nil {
		signal.(func(*std_core.QMetaMethod))(std_core.NewQMetaMethodFromPointer(sign))
	} else {
		NewMocLabelFromPointer(ptr).ConnectNotifyDefault(std_core.NewQMetaMethodFromPointer(sign))
	}
}

func (ptr *MocLabel) ConnectNotifyDefault(sign std_core.QMetaMethod_ITF) {
	qt.Debug("	MocLabel                                     ConnectNotifyDefault(sign std_core.QMetaMethod_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_ConnectNotifyDefault(ptr.Pointer(), std_core.PointerFromQMetaMethod(sign))
	}
}

//export callbackMocLabel_CustomEvent
func callbackMocLabel_CustomEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_CustomEvent(ptr unsafe.Pointer, event unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "customEvent"); signal != nil {
		signal.(func(*std_core.QEvent))(std_core.NewQEventFromPointer(event))
	} else {
		NewMocLabelFromPointer(ptr).CustomEventDefault(std_core.NewQEventFromPointer(event))
	}
}

func (ptr *MocLabel) CustomEventDefault(event std_core.QEvent_ITF) {
	qt.Debug("	MocLabel                                     CustomEventDefault(event std_core.QEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_CustomEventDefault(ptr.Pointer(), std_core.PointerFromQEvent(event))
	}
}

//export callbackMocLabel_DeleteLater
func callbackMocLabel_DeleteLater(ptr unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_DeleteLater(ptr unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "deleteLater"); signal != nil {
		signal.(func())()
	} else {
		NewMocLabelFromPointer(ptr).DeleteLaterDefault()
	}
}

func (ptr *MocLabel) DeleteLaterDefault() {
	qt.Debug("	MocLabel                                     DeleteLaterDefault() ")
	if ptr.Pointer() != nil {
		C.MocLabel_DeleteLaterDefault(ptr.Pointer())
		ptr.SetPointer(nil)
		runtime.SetFinalizer(ptr, nil)
	}
}

//export callbackMocLabel_Destroyed
func callbackMocLabel_Destroyed(ptr unsafe.Pointer, obj unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_Destroyed(ptr unsafe.Pointer, obj unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "destroyed"); signal != nil {
		signal.(func(*std_core.QObject))(std_core.NewQObjectFromPointer(obj))
	}

}

//export callbackMocLabel_DisconnectNotify
func callbackMocLabel_DisconnectNotify(ptr unsafe.Pointer, sign unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_DisconnectNotify(ptr unsafe.Pointer, sign unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "disconnectNotify"); signal != nil {
		signal.(func(*std_core.QMetaMethod))(std_core.NewQMetaMethodFromPointer(sign))
	} else {
		NewMocLabelFromPointer(ptr).DisconnectNotifyDefault(std_core.NewQMetaMethodFromPointer(sign))
	}
}

func (ptr *MocLabel) DisconnectNotifyDefault(sign std_core.QMetaMethod_ITF) {
	qt.Debug("	MocLabel                                     DisconnectNotifyDefault(sign std_core.QMetaMethod_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_DisconnectNotifyDefault(ptr.Pointer(), std_core.PointerFromQMetaMethod(sign))
	}
}

//export callbackMocLabel_ObjectNameChanged
func callbackMocLabel_ObjectNameChanged(ptr unsafe.Pointer, objectName C.struct_Moc_PackedString) {
	qt.Debug("	MocLabel                                     callbackMocLabel_ObjectNameChanged(ptr unsafe.Pointer, objectName C.struct_Moc_PackedString) ")
	if signal := qt.GetSignal(ptr, "objectNameChanged"); signal != nil {
		signal.(func(string))(cGoUnpackString(objectName))
	}

}

//export callbackMocLabel_TimerEvent
func callbackMocLabel_TimerEvent(ptr unsafe.Pointer, event unsafe.Pointer) {
	qt.Debug("	MocLabel                                     callbackMocLabel_TimerEvent(ptr unsafe.Pointer, event unsafe.Pointer) ")
	if signal := qt.GetSignal(ptr, "timerEvent"); signal != nil {
		signal.(func(*std_core.QTimerEvent))(std_core.NewQTimerEventFromPointer(event))
	} else {
		NewMocLabelFromPointer(ptr).TimerEventDefault(std_core.NewQTimerEventFromPointer(event))
	}
}

func (ptr *MocLabel) TimerEventDefault(event std_core.QTimerEvent_ITF) {
	qt.Debug("	MocLabel                                     TimerEventDefault(event std_core.QTimerEvent_ITF) ")
	if ptr.Pointer() != nil {
		C.MocLabel_TimerEventDefault(ptr.Pointer(), std_core.PointerFromQTimerEvent(event))
	}
}
