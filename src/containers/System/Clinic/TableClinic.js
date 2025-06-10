import React from "react";
import "./TableClinic.scss";

const TableClinic = ({ clinics, onEdit, onDelete }) => {
  return (
    <div className="table-clinic-container">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Tên phòng khám</th>
            <th>Địa chỉ</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {clinics && clinics.length > 0 ? (
            clinics.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.address}</td>
             
                <td>
                  <button
                    className="btn btn-info text-white btn-sm me-2"
                    onClick={() => onEdit(item)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger text-white btn-sm"
                    onClick={() => onDelete(item.id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableClinic;