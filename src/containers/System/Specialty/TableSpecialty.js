import React from "react";
import "./TableSpecialty.scss";

const TableSpecialty = ({ specialties, onEdit, onDelete }) => {
  return (
    <div className="table-specialty-container">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Tên chuyên khoa</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {specialties && specialties.length > 0 ? (
            specialties.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
              
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
              <td colSpan={3} className="text-center">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableSpecialty;