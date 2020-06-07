#!/usr/bin/env python3

import csv
from sys import argv

def convert_student(input_file, output_file):
    def safe_id_convert(value):
        try:
            int_val = int(value)
            if int_val >= 0:
                return int_val
            else:
                raise ValueError
        except ValueError:
            return ""


    def safe_gpa_convert(value):
        try:
            return float(value)
        except ValueError:
            return ""


    output_fieldnames = ["id", "name", "username", "selection_preference", "gpa",
                         "minor", "experience", "email", "project_id", "first_project",
                         "second_project", "third_project"]
    input_dictreader = csv.DictReader(input_file)
    output_dictwriter = csv.DictWriter(output_file, output_fieldnames, restval="")
    output_dictwriter.writeheader()
    for input_row in input_dictreader:
        output_row = {}
        for key in input_row:
            if key == "id":
                output_row["id"] = input_row[key]
            elif key == "gpa":
                output_row["gpa"] = safe_gpa_convert(input_row[key])
            elif key == "project_1_id":
                output_row["first_project"] = safe_id_convert(input_row[key])
            elif key == "project_2_id":
                output_row["second_project"] = safe_id_convert(input_row[key])
            elif key == "project_3_id":
                output_row["third_project"] = safe_id_convert(input_row[key])
            elif key == "pt_preference":
                if input_row[key] == "team":
                    output_row["selection_preference"] = "true"
                elif input_row[key] == "project":
                    output_row["selection_preference"] = "false"
                else:
                    output_row["selection_preference"] = ""

        output_row["project_id"] = 1
        output_row["email"] = "undefined@mines.edu"
        output_dictwriter.writerow(output_row)

def convert_project(input_file, output_file):
    output_fieldnames = ["id", "name", "description", "client_name", "client_email", 
        "client_company", "min_students", "max_students"]

    input_dictreader = csv.DictReader(input_file)
    output_dictwriter = csv.DictWriter(output_file, output_fieldnames, restval="NULL")
    output_dictwriter.writeheader()

    for input_row in input_dictreader:
        output_row = {}
        for key in input_row:
            if key == "id":
                output_row["id"] = input_row[key]
            elif key == "company":
                output_row["client_company"] = input_row[key]
            elif key == "contact_name":
                output_row["client_name"] = input_row[key]
            elif key == "contact_email":
                output_row["client_email"] = input_row[key]
            elif key == "description":
                output_row["description"] = input_row[key]
            elif key == "member_minimum":
                output_row["min_students"] = input_row[key]
            elif key == "member_maximum":
                output_row["max_students"] = input_row[key]
            
            output_row["name"] = "No Name"
        output_dictwriter.writerow(output_row)



def convert_prefer_teammate_xref(input_file, output_file):
    output_fieldnames = ["preferrer_id", "preferree_id"]
    input_dictreader = csv.DictReader(input_file)
    output_dictwriter = csv.DictWriter(output_file, output_fieldnames, restval="NULL")
    output_dictwriter.writeheader()
    for input_row in input_dictreader:
        output_row = {}
        output_row["preferrer_id"] = input_row["student_id"]
        output_row["preferree_id"] = input_row["preferred_student_id"]
        output_dictwriter.writerow(output_row)


def convert_avoid_teammate_xref(input_file, output_file):
    output_fieldnames = ["avoider_id", "avoidee_id"]
    input_dictreader = csv.DictReader(input_file)
    output_dictwriter = csv.DictWriter(output_file, output_fieldnames, restval="NULL")
    output_dictwriter.writeheader()
    for input_row in input_dictreader:
        output_row = {}
        output_row["avoider_id"] = input_row["student_id"]
        output_row["avoidee_id"] = input_row["undesired_student_id"]
        output_dictwriter.writerow(output_row)


if __name__ == "__main__":
    usage = "usage: python3 csv_convert.py path/to/input/file path/to/output/file\n          (--student|--project|--avoid_teammate_xref|--prefer_teammate_xref)"

    if len(argv) != 4:
        print(usage)
    else:
        input_file = open(argv[1], "r")
        output_file = open(argv[2], "w")

        if argv[3] == "--student":
            convert_student(input_file, output_file)
        elif argv[3] == "--project":
            convert_project(input_file, output_file)
        elif argv[3] == "--avoid_teammate_xref":
            convert_avoid_teammate_xref(input_file, output_file)
        elif argv[3] == "--prefer_teammate_xref":
            convert_prefer_teammate_xref(input_file, output_file)
        else:
            print(usage)

        input_file.close()
        output_file.close()
