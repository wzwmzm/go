

#pragma once

#ifndef GO_MOC_H
#define GO_MOC_H

#include <stdint.h>

#ifdef __cplusplus
class Widget;
void Widget_Widget_QRegisterMetaTypes();
class XYSeriesIODevice;
void XYSeriesIODevice_XYSeriesIODevice_QRegisterMetaTypes();
extern "C" {
#endif

struct Moc_PackedString { char* data; long long len; };
struct Moc_PackedList { void* data; long long len; };
int XYSeriesIODevice_XYSeriesIODevice_QRegisterMetaType();
int XYSeriesIODevice_XYSeriesIODevice_QRegisterMetaType2(char* typeName);
int XYSeriesIODevice_XYSeriesIODevice_QmlRegisterType();
int XYSeriesIODevice_XYSeriesIODevice_QmlRegisterType2(char* uri, int versionMajor, int versionMinor, char* qmlName);
void* XYSeriesIODevice___dynamicPropertyNames_atList(void* ptr, int i);
void XYSeriesIODevice___dynamicPropertyNames_setList(void* ptr, void* i);
void* XYSeriesIODevice___dynamicPropertyNames_newList(void* ptr);
void* XYSeriesIODevice___findChildren_atList2(void* ptr, int i);
void XYSeriesIODevice___findChildren_setList2(void* ptr, void* i);
void* XYSeriesIODevice___findChildren_newList2(void* ptr);
void* XYSeriesIODevice___findChildren_atList3(void* ptr, int i);
void XYSeriesIODevice___findChildren_setList3(void* ptr, void* i);
void* XYSeriesIODevice___findChildren_newList3(void* ptr);
void* XYSeriesIODevice___findChildren_atList(void* ptr, int i);
void XYSeriesIODevice___findChildren_setList(void* ptr, void* i);
void* XYSeriesIODevice___findChildren_newList(void* ptr);
void* XYSeriesIODevice___children_atList(void* ptr, int i);
void XYSeriesIODevice___children_setList(void* ptr, void* i);
void* XYSeriesIODevice___children_newList(void* ptr);
void* XYSeriesIODevice_NewXYSeriesIODevice2(void* parent);
void* XYSeriesIODevice_NewXYSeriesIODevice();
void XYSeriesIODevice_DestroyXYSeriesIODevice(void* ptr);
void XYSeriesIODevice_DestroyXYSeriesIODeviceDefault(void* ptr);
char XYSeriesIODevice_OpenDefault(void* ptr, long long mode);
char XYSeriesIODevice_ResetDefault(void* ptr);
char XYSeriesIODevice_SeekDefault(void* ptr, long long pos);
char XYSeriesIODevice_WaitForBytesWrittenDefault(void* ptr, int msecs);
char XYSeriesIODevice_WaitForReadyReadDefault(void* ptr, int msecs);
long long XYSeriesIODevice_ReadData(void* ptr, char* data, long long maxSize);
long long XYSeriesIODevice_ReadDataDefault(void* ptr, char* data, long long maxSize);
long long XYSeriesIODevice_ReadLineDataDefault(void* ptr, char* data, long long maxSize);
long long XYSeriesIODevice_WriteData(void* ptr, char* data, long long maxSize);
long long XYSeriesIODevice_WriteDataDefault(void* ptr, char* data, long long maxSize);
void XYSeriesIODevice_CloseDefault(void* ptr);
char XYSeriesIODevice_AtEndDefault(void* ptr);
char XYSeriesIODevice_CanReadLineDefault(void* ptr);
char XYSeriesIODevice_IsSequentialDefault(void* ptr);
long long XYSeriesIODevice_BytesAvailableDefault(void* ptr);
long long XYSeriesIODevice_BytesToWriteDefault(void* ptr);
long long XYSeriesIODevice_PosDefault(void* ptr);
long long XYSeriesIODevice_SizeDefault(void* ptr);
char XYSeriesIODevice_EventDefault(void* ptr, void* e);
char XYSeriesIODevice_EventFilterDefault(void* ptr, void* watched, void* event);
void XYSeriesIODevice_ChildEventDefault(void* ptr, void* event);
void XYSeriesIODevice_ConnectNotifyDefault(void* ptr, void* sign);
void XYSeriesIODevice_CustomEventDefault(void* ptr, void* event);
void XYSeriesIODevice_DeleteLaterDefault(void* ptr);
void XYSeriesIODevice_DisconnectNotifyDefault(void* ptr, void* sign);
void XYSeriesIODevice_TimerEventDefault(void* ptr, void* event);
;
int Widget_Widget_QRegisterMetaType();
int Widget_Widget_QRegisterMetaType2(char* typeName);
int Widget_Widget_QmlRegisterType();
int Widget_Widget_QmlRegisterType2(char* uri, int versionMajor, int versionMinor, char* qmlName);
void* Widget___addActions_actions_atList(void* ptr, int i);
void Widget___addActions_actions_setList(void* ptr, void* i);
void* Widget___addActions_actions_newList(void* ptr);
void* Widget___insertActions_actions_atList(void* ptr, int i);
void Widget___insertActions_actions_setList(void* ptr, void* i);
void* Widget___insertActions_actions_newList(void* ptr);
void* Widget___actions_atList(void* ptr, int i);
void Widget___actions_setList(void* ptr, void* i);
void* Widget___actions_newList(void* ptr);
void* Widget___dynamicPropertyNames_atList(void* ptr, int i);
void Widget___dynamicPropertyNames_setList(void* ptr, void* i);
void* Widget___dynamicPropertyNames_newList(void* ptr);
void* Widget___findChildren_atList2(void* ptr, int i);
void Widget___findChildren_setList2(void* ptr, void* i);
void* Widget___findChildren_newList2(void* ptr);
void* Widget___findChildren_atList3(void* ptr, int i);
void Widget___findChildren_setList3(void* ptr, void* i);
void* Widget___findChildren_newList3(void* ptr);
void* Widget___findChildren_atList(void* ptr, int i);
void Widget___findChildren_setList(void* ptr, void* i);
void* Widget___findChildren_newList(void* ptr);
void* Widget___children_atList(void* ptr, int i);
void Widget___children_setList(void* ptr, void* i);
void* Widget___children_newList(void* ptr);
void* Widget_NewWidget(void* parent, long long fo);
void Widget_DestroyWidget(void* ptr);
char Widget_CloseDefault(void* ptr);
char Widget_EventDefault(void* ptr, void* event);
char Widget_FocusNextPrevChildDefault(void* ptr, char next);
char Widget_NativeEventDefault(void* ptr, void* eventType, void* message, long result);
void Widget_ActionEventDefault(void* ptr, void* event);
void Widget_ChangeEventDefault(void* ptr, void* event);
void Widget_CloseEventDefault(void* ptr, void* event);
void Widget_ContextMenuEventDefault(void* ptr, void* event);
void Widget_DragEnterEventDefault(void* ptr, void* event);
void Widget_DragLeaveEventDefault(void* ptr, void* event);
void Widget_DragMoveEventDefault(void* ptr, void* event);
void Widget_DropEventDefault(void* ptr, void* event);
void Widget_EnterEventDefault(void* ptr, void* event);
void Widget_FocusInEventDefault(void* ptr, void* event);
void Widget_FocusOutEventDefault(void* ptr, void* event);
void Widget_HideDefault(void* ptr);
void Widget_HideEventDefault(void* ptr, void* event);
void Widget_InputMethodEventDefault(void* ptr, void* event);
void Widget_KeyPressEventDefault(void* ptr, void* event);
void Widget_KeyReleaseEventDefault(void* ptr, void* event);
void Widget_LeaveEventDefault(void* ptr, void* event);
void Widget_LowerDefault(void* ptr);
void Widget_MouseDoubleClickEventDefault(void* ptr, void* event);
void Widget_MouseMoveEventDefault(void* ptr, void* event);
void Widget_MousePressEventDefault(void* ptr, void* event);
void Widget_MouseReleaseEventDefault(void* ptr, void* event);
void Widget_MoveEventDefault(void* ptr, void* event);
void Widget_PaintEventDefault(void* ptr, void* event);
void Widget_RaiseDefault(void* ptr);
void Widget_RepaintDefault(void* ptr);
void Widget_ResizeEventDefault(void* ptr, void* event);
void Widget_SetDisabledDefault(void* ptr, char disable);
void Widget_SetEnabledDefault(void* ptr, char vbo);
void Widget_SetFocus2Default(void* ptr);
void Widget_SetHiddenDefault(void* ptr, char hidden);
void Widget_SetStyleSheetDefault(void* ptr, struct Moc_PackedString styleSheet);
void Widget_SetVisibleDefault(void* ptr, char visible);
void Widget_SetWindowModifiedDefault(void* ptr, char vbo);
void Widget_SetWindowTitleDefault(void* ptr, struct Moc_PackedString vqs);
void Widget_ShowDefault(void* ptr);
void Widget_ShowEventDefault(void* ptr, void* event);
void Widget_ShowFullScreenDefault(void* ptr);
void Widget_ShowMaximizedDefault(void* ptr);
void Widget_ShowMinimizedDefault(void* ptr);
void Widget_ShowNormalDefault(void* ptr);
void Widget_TabletEventDefault(void* ptr, void* event);
void Widget_UpdateDefault(void* ptr);
void Widget_UpdateMicroFocusDefault(void* ptr);
void Widget_WheelEventDefault(void* ptr, void* event);
void* Widget_PaintEngineDefault(void* ptr);
void* Widget_MinimumSizeHintDefault(void* ptr);
void* Widget_SizeHintDefault(void* ptr);
void* Widget_InputMethodQueryDefault(void* ptr, long long query);
char Widget_HasHeightForWidthDefault(void* ptr);
int Widget_HeightForWidthDefault(void* ptr, int w);
int Widget_MetricDefault(void* ptr, long long m);
char Widget_EventFilterDefault(void* ptr, void* watched, void* event);
void Widget_ChildEventDefault(void* ptr, void* event);
void Widget_ConnectNotifyDefault(void* ptr, void* sign);
void Widget_CustomEventDefault(void* ptr, void* event);
void Widget_DeleteLaterDefault(void* ptr);
void Widget_DisconnectNotifyDefault(void* ptr, void* sign);
void Widget_TimerEventDefault(void* ptr, void* event);
;

#ifdef __cplusplus
}
#endif

#endif