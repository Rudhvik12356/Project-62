import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppHeader from './components/AppHeader';
import db from './config';

export default class HomeScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      allStudents: [],
    };
  }

  studentList = () => {
    db.ref('/').on('value', (data) => {
      var allStudents = [];
      var class_a = data.val().classA;

      for (var i in class_a) {
        allStudents.push(class_a[i]);
      }

      allStudents.sort(function (a, b) {
        return a.rollNo - b.rollNo;
      });
      this.setState({ allStudents: allStudents });
    });
  };

  componentDidMount() {
    this.studentList();
  }

  updateAttendance(rollNo, status) {
    var id = '';

    if (rollNo <= 9) {
      id = '0' + rollNo;
    } else {
      id = rollNo;
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    today = dd + '-' + mm + '-' + yyyy;
    var refPath = id;
    var classRef = db.ref(refPath);

    classRef.update({
      [today]: status,
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppHeader />
        <View>
          <Text style={styles.textName}>1. Jack</Text>
        </View>

        <TouchableOpacity style={styles.attendance}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'monospace',
              fontWeight: 'bold',
              backgroundColor: 'lime',
              marginLeft: 300,
              marginTop: -22,
              border: 'solid',
            }}>
            Present
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.attendance}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'monospace',
              fontWeight: 'bold',
              backgroundColor: 'red',
              marginLeft: 470,
              marginTop: -29,
              border: 'solid',
            }}>
            Absent
          </Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.textName}>2. John</Text>
        </View>

        <TouchableOpacity style={styles.attendance}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'monospace',
              fontWeight: 'bold',
              backgroundColor: 'lime',
              marginLeft: 300,
              marginTop: -22,
              border: 'solid',
            }}>
            Present
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.attendance}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'monospace',
              fontWeight: 'bold',
              backgroundColor: 'red',
              marginLeft: 470,
              marginTop: -28,
              border: 'solid',
            }}>
            Absent
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submit} onPress={this.updateAttendance}>
          <Text
            style={{
              fontSize: 85,
              fontFamily: 'monospace',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },

  attendance: {
    width: 80,
    alignItems: 'center',
  },

  submit: {
    backgroundColor: 'yellow',
    width: 300,
    height: 150,
    border: 'solid',
    borderRadius: 200,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
});
