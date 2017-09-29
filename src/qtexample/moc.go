package main

import "github.com/therecipe/qt/core"

//this struct will let qtmoc generate the necessary Go and C++ code.
//such as the NewExampleStruct and DestroyExampleStruct functions
type exampleStruct struct {
	//let qtmoc know what class you want to sub-class
	//this can be any class that is derived from QObject
	//and could also be one of your own moc classes
	//it's important that you anonymously embed the type as a value here
	//qtmoc will ignore this struct otherwise
	core.QObject

	//this will let qtmoc know that you want to have the "init" function called
	//when you call NewExampleStruct
	_ func() `constructor:"init"`

	//this will let qtmoc know that you want a signal called "firstSignal"
	//so that the related Connect* Disconnect* functions can be created
	_ func() `signal:"firstSignal"`

	//the signal can also have parameters, but no return parameter
	//return parameters are only possible if you create a slot
	_ func(bool, int, string, []string, map[string]string) `signal:"secondSignal"`

	//you can also let the signal accept a single *core.QObject an array or a map
	_ func(*core.QObject, []*core.QObject, map[string]*core.QObject) `signal:"thirdSignal"`

	//as a special addition to the supported Go primitives, you can also use Go errors in signals/slots/properties
	_ func(error) `signals:"fourthSignal"`

	//this will let qtmoc know that you want a slot called "firstSlot"
	_ func() `slot:"firstSlot"`

	//a slot can be created in the same way as a signal, but it can additionally return a single argument
	_ func(string) string               `slot:"secondSlot"`
	_ func(*core.QObject) *core.QObject `slot:"thirdSlot"`
	_ func() error                      `slot:"fourthSlot"`

	//this will let qtmoc know that you want a property called "firstProperty"
	//there will be helper getter + setter functions and a changed signal created called:
	//FirstProperty (IsFirstProperty for bools), SetFirstProperty, FirstProperyChanged
	_ string `property:"firstProperty"`
}

//this function will be automatically called, when you use the `NewExampleStruct` function
func (s *exampleStruct) init() {
	//here you can do some initializing
	s.SetFirstProperty("defaultString")
	s.ConnectFirstSignal(func() {
		println("do something here")
	})
	s.ConnectSecondSignal(s.secondSignal)
}

func (s *exampleStruct) secondSignal(v0 bool, v1 int, v2 string, v3 []string, v4 map[string]string) {
	println("do something here")
}
